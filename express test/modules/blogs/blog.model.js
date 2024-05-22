//1.import mongoose
//2.get schema
//3.write down the properties of object(schema
//4.create model from schema

const { Schema, model } = require("mongoose");
const { ObjectId } = Schema.Types;

const blogSchema = new Schema(
  {
    title: { type: String, required: [true, "title is missing"] },
    slug: { type: String, required: true, unique: true },
    tags: [String],
    content: { type: String },
    author: { type: ObjectId, ref: "User", required: true },
    words: { type: Number, default: 0 },
    status: { type: String, enum: ["published", "draft"], default: "draft" },
    // createdAt: { type: Date, default: Date.now },
    // updatedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

// const blogModel = new model({Blog,blogSchema});a=b=c(concept)

module.exports = new model("Blog", blogSchema);
