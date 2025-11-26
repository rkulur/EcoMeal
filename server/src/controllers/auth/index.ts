import bcrypt from "bcryptjs";
import { FastifyReply, FastifyRequest } from "fastify";
import { OAuth2Client } from "google-auth-library";
import User, { IUser } from "../../models/User.model";
import { generateToken } from "../../utils/generateToken";
import { successResponse } from "../../utils/responseWrapper";
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

interface UserData {
  email: string;
  password?: string;
  name?: string;
  picture?: string;
  role?: string;
}

interface GoogleAuthRequest extends FastifyRequest {
  query: {
    role: "donor" | "ngo" | "carehome" | "composter";
  };
  body: {
    token: string;
  };
  jwt: {
    sign: (payload: { id: unknown }) => string;
  };
}

interface LoginRequest extends FastifyRequest {
  body: {
    email: string;
    password: string;
  };
  jwt: {
    sign: (payload: { id: unknown }) => string;
  };
}

const createUser = async (userData: UserData, role: string): Promise<IUser> => {
  const { email, password, name } = userData;
  if (!email) {
    throw new Error("Email is required");
  }
  const userExists = !!(await User.exists({ email }));
  if (userExists) {
    throw new Error("User already exists");
  }
  let hashedPassword: string | undefined;
  if (password) {
    const salt = await bcrypt.genSalt(10);
    hashedPassword = await bcrypt.hash(password, salt);
  }
  const user = await User.create({
    name: name || email.split("@")[0],
    email,
    password: hashedPassword,
    role,
    isGoogleAuth: !password,
  });
  return user;
};

const googleAuth = async (request: GoogleAuthRequest, reply: FastifyReply) => {
  try {
    const { token } = request.body;

    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    if (!payload) {
      throw new Error("Invalid Google token");
    }

    const { email, name, picture } = payload;
    if (!email) {
      throw new Error("Email is required from Google Auth");
    }

    let user: any = await User.findOne({ email });

    if (!user) {
      reply.send({ email, name, picture, login: false });
      return;
    }

    const jwtToken = generateToken(request.server.jwt, user);

    reply.send({
      login: true,
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      picture: user.picture,
      token: jwtToken,
    });
  } catch (error) {
    reply.code(400).send({
      error: error instanceof Error ? error.message : "An error occurred",
    });
  }
};

const login = async (request: LoginRequest, reply: FastifyReply) => {
  try {
    const { email, password } = request.body;
    const user = await User.findOne({ email });
    if (!user) {
      return reply.code(401).send({ message: "Invalid email or password" });
    }

    if (user.isGoogleAuth) {
      return reply.code(401).send({ message: "Please login using Google" });
    }

    if (!user.password) {
      return reply.code(401).send({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return reply.code(401).send({ message: "Invalid email or password" });
    }

    const token = generateToken(request.server.jwt, user);

    const payload = {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token,
    };
    return reply
      .code(201)
      .send(
        successResponse(
          payload,
          `${user.role.charAt(0).toUpperCase() + user.role.substring(1)} registered successfully`,
        ),
      );
  } catch (error) {
    reply.code(500).send({
      error: error instanceof Error ? error.message : "An error occurred",
    });
  }
};

export * from "./registerCarehome.controller";
export * from "./registerComposter.controller";
export * from "./registerDonor.controller";
export * from "./registerNgo.controller";
export { googleAuth, login };
