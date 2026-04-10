import mongoose,{Document, Types} from "mongoose";
import shopproductmodel from "";


interface CartItem{
productId:mongoose.Types.ObjectId;
quantity:Number;
}

export interface CartDocument extends Document{
  userId:mongoose.Types.ObjectId;
  items:CartItem[];
}


const CartSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    items: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "AdminProducts",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          min: 1,
        },
      },
    ],
  },
  {
    timestamps: true,
  },
);


const Cart=mongoose.model("Cart",CartSchema)

export default Cart;