import { Schema } from "mongoose";

export const BookSchema = new Schema({
  title: { type: String, required: true },
  author: { type: Schema.Types.ObjectId,ref:'Author', required: true },
  publishedDate: { type: Date, required: true },
  pages: { type: Number, required: true },
});
