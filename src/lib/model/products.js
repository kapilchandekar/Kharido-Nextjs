import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  img: { type: String, required: true },
  category: { type: String, required: true },
  size: { type: String },
  color: { type: String },
  price: { type: Number, required: true },
  availableQty: { type: Number, required: true },
});

export const product =
  mongoose.models.products || mongoose.model("products", productSchema);
