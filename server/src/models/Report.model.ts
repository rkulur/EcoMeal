import { Schema, model, Types } from "mongoose";

export interface IReport {
  user: Types.ObjectId;
  type: "NGO" | "CareHome";
  title: string;
  description: string;
  createdAt?: Date;
}

const reportSchema = new Schema<IReport>(
  {
    user: { type: Schema.Types.ObjectId, ref: "Users", required: true },
    type: {
      type: String,
      enum: ["NGO", "CareHome"],
      required: true,
    },
    title: { type: String, required: true },
    description: { type: String, required: true },
  },
  { timestamps: { createdAt: true, updatedAt: false } },
);

export const ReportModel = model<IReport>("Report", reportSchema);
