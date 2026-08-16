import mongoose, { Schema, type Document, type Model, type Types } from "mongoose"

export interface IBlog extends Document {
    _id: Types.ObjectId
    title: string
    slug: string
    keywords: string[]
    metaTitle: string
    metaDescription: string
    categories: Types.ObjectId[]
    thumbnail: {
        url: string
        publicId: string
    }
    shortDescription: string
    longDescription: string
    isActive: boolean
    views: number
    readTime: string
    publishedAt: Date
    createdAt: Date
    updatedAt: Date
}

const BlogSchema = new Schema<IBlog>(
    {
        title: { type: String, required: true, trim: true },
        slug: { type: String, required: true, trim: true, unique: true, lowercase: true, index: true },
        keywords: { type: [String], default: [] },
        metaTitle: { type: String, default: "", trim: true },
        metaDescription: { type: String, default: "", trim: true },
        categories: [{ type: Schema.Types.ObjectId, ref: "Category" }],
        thumbnail: {
            url: { type: String, default: "" },
            publicId: { type: String, default: "" },
        },
        shortDescription: { type: String, default: "", trim: true },
        longDescription: { type: String, default: "" },
        isActive: { type: Boolean, default: true, index: true },
        views: { type: Number, default: 0 },
        readTime: { type: String, default: "1 min read" },
        publishedAt: { type: Date, default: Date.now },
    },
    { timestamps: true }
)

// Compute read time from long description before saving
BlogSchema.pre('save', async function () {
    // Only run if the description was actually changed
    if (this.isModified("longDescription")) {
        const description = this.longDescription || "";
        
        // Robust word count: matches non-whitespace characters
        // Returns 0 if the string is empty or just spaces
        const words = description.trim().match(/\S+/g)?.length || 0;

        if (words === 0) {
            // Clear the field if the description is empty
            this.readTime = `${0} min read`; 
        } else {
            // Calculate read time (assuming 200 words per minute)
            const minutes = Math.max(1, Math.ceil(words / 200));
            this.readTime = `${minutes} min read`;
        }
    }
});


const Blog: Model<IBlog> = (mongoose.models.Blog as Model<IBlog>) || mongoose.model<IBlog>("Blog", BlogSchema)

export default Blog;
