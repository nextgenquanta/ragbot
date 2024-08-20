import { Schema, model } from "mongoose";

const embeddingSchema = new Schema(
  {
    text: {
      type: String,
      required: true,
    },
    embedding: {
      type: [Number],
      required: true,
    },
  },
  {
    timestamps: true,
  },
);
const Embedding = model("Embedding", embeddingSchema);
export default Embedding;
