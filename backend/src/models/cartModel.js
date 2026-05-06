// import mongoose,{Document} from "mongoose";


// interface CartItem{
// productId:mongoose.Types.ObjectId;
// quantity:number;
// }

// export interface CartDocument extends Document{
//   userId:mongoose.Types.ObjectId;
//   items:CartItem[];
// }


// const CartSchema = new mongoose.Schema<CartDocument>(
//   {
//     userId: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//       required: true,
//     },
//     items: [
//       {
//         productId: {
//           type: mongoose.Schema.Types.ObjectId,
//           ref: "AdminProducts",
//           required: true,
//         },
//         quantity: {
//           type: Number,
//           required: true,
//           min: 1,
//         },
//       },
//     ],
//   },
//   {
//     timestamps: true,
//   },
// );


// const Cart=mongoose.model<CartDocument>("Cart",CartSchema)

// export default Cart;

import mongoose from "mongoose";

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
  }
);

const Cart = mongoose.model("Cart", CartSchema);

export default Cart;