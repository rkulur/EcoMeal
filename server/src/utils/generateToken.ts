import { FastifyInstance } from "fastify/fastify";

export function generateToken(
  jwt: FastifyInstance["jwt"],
  user: { _id: any; role: string },
) {
  return jwt.sign({
    id: user._id,
    role: user.role,
  });
}
