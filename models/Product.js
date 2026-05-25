import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  productName: {
    type: String,
    required: [true, "Product name is required"],
    trim: true
  },
  price: {
    type: Number,
    required: [true, "Price is required"],
    min: 0
  },
  imageUrl: {
    type: String,
    default: "https://via.placeholder.com/300"
  },
  description: {
    type: String,
    required: [true, "Description is required"]
  }
}, { timestamps: true });

export default mongoose.model("Product", productSchema);