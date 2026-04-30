import mongoose from "mongoose";
const contactSchema = new mongoose.Schema(
  {
    contactUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
    },
    message: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);
export const Contact = mongoose.model("Contact", contactSchema);
