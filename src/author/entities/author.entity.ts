import { Schema, Document } from 'mongoose';

export interface Author extends Document {
  readonly name: string;
  readonly description: string;
  readonly nationality: string;
}

export const AuthorSchema = new Schema<Author>({
  name: { type: String, required: true },
  nationality: { type: String, required: true },
  description: { type: String, required: true },
});
