// __tests__/connectDB.test.ts
import mongoose from "mongoose";
import { connectDB } from "../src/config/db";

// jest types
type JestMock = jest.Mock;

// Mock mongoose.connect
jest.mock("mongoose", () => ({
  connect: jest.fn(),
}));

describe("connectDB", () => {
  const OLD_ENV = process.env;

  beforeEach(() => {
    jest.resetAllMocks();
    process.env = { ...OLD_ENV, MONGODB_URI: "mongodb://test:27017/mydb" };
  });

  afterEach(() => {
    process.env = OLD_ENV;
    jest.restoreAllMocks();
  });

  it("logs host when mongoose.connect resolves", async () => {
    const connectMock = mongoose.connect as unknown as JestMock;
    // simulate resolved connection object with connection.host
    connectMock.mockResolvedValueOnce({ connection: { host: "mock-host" } });

    const logSpy = jest.spyOn(console, "log").mockImplementation(() => {});

    await connectDB();

    expect(connectMock).toHaveBeenCalledWith(process.env.MONGODB_URI);
    expect(logSpy).toHaveBeenCalledWith("MongoDB Connected: mock-host");
  });

  it("logs error and calls process.exit(1) when mongoose.connect rejects", async () => {
    const connectMock = mongoose.connect as unknown as JestMock;
    connectMock.mockRejectedValueOnce(new Error("connection failed"));

    const errorSpy = jest.spyOn(console, "error").mockImplementation(() => {});
    // make process.exit throw so we can assert it was called without terminating the test runner
    const exitSpy = jest.spyOn(process, "exit").mockImplementation(((
      code?: number,
    ) => {
      throw new Error(`process.exit called with code ${code}`);
    }) as never);

    await expect(connectDB()).rejects.toThrow(
      "process.exit called with code 1",
    );

    expect(errorSpy).toHaveBeenCalledWith("Error: connection failed");
    expect(exitSpy).toHaveBeenCalledWith(1);
  });
});
