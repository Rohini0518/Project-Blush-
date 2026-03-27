import mongoose from "mongoose";

const AdminProductSchema = new mongoose.Schema(
  {
    image: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    category: {
      type: String,
    },
    size: {
      type: String,
    },
    price: {
      type: Number,
      required: true,
    },
    salePrice: {
      type: Number,
    },
    totalStock: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true },
);


const AdminProducts=mongoose.model("AdminProduct", AdminProductSchema)

export default AdminProducts