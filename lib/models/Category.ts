import mongoose, { Schema, type Document, type Model, type Types } from "mongoose"

export interface ICategory extends Document {
  _id: Types.ObjectId
  name: string
  slug: string
  createdAt: Date
  updatedAt: Date
}

const CategorySchema = new Schema<ICategory>(
  {
    name: { type: String, required: true, trim: true, unique: true },
    slug: { type: String, required: true, trim: true, unique: true, lowercase: true, index: true },
  },
  { timestamps: true }
)

// Prevent model recompilation in dev hot-reload
const Category: Model<ICategory> =
  (mongoose.models.Category as Model<ICategory>) ||
  mongoose.model<ICategory>("Category", CategorySchema)

export default Category
