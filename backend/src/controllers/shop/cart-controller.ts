import Cart from "../../models/cartModel.js";
import AdminProducts from "../../models/admin/adminProductModel.js";
import type { Request, Response} from "express";

interface CartItemRequest{
  userId:string;
  productId:string;
  quantity:number;
}


interface FetchCartItemsRequestParams{
  userId:string;
}


interface DeleteCartItemParams{
  userId:string;
  productId:string;
}

const addToCart = async (req:Request<{}, {}, CartItemRequest>, res:Response):Promise<void> => {
  try {
    const { userId, productId, quantity } = req.body;
    if (!userId || !productId || quantity <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid Data provided",
      });
    }
    const product = await AdminProducts.findById(productId);
    if (!product) {
      return res.status(400).json({
        success: false,
        message: "No Product Found",
      });
    }
    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({ userId, items: [] });
    }
    const findCurrentProductIndex = cart.items.findIndex(
      (item) => item.productId.toString() === productId,
    );

    if (findCurrentProductIndex === -1) {
      cart.items.push({ productId, quantity });
    } else {
      cart.items[findCurrentProductIndex].quantity += quantity;
    }

    const savedcart = await cart.save();
    console.log(savedcart);
    res.status(200).json({
      success: true,
      data: savedcart,
      message: "cart item added succesfully",
    });
  }
  catch (error) {
  if (error instanceof Error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  } else {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
}
};

const fetchCartItems = async (req:Request<FetchCartItemsRequestParams>, res:Response):Promise<void> => {
  try {
    const { userId } = req.params;
    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "userId Is Mandatory",
      });
    }

    const cart = await Cart.findOne({ userId }).populate({
      path: "items.productId",
      select: "image title price salePrice",
    });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "No Cart Found",
      });
    }
    const validItems = cart.items.filter((product) => product.productId);

    if (validItems.length < cart.items.length) {
      cart.items = validItems;
      await cart.save();
    }
    const populateCartItems = validItems.map((item) => ({
      productId: item.productId._id,
      image: item.productId.image,
      title: item.productId.title,
      price: item.productId.price,
      salePrice: item.productId.salePrice,
      quantity: item.quantity,
    }));

    res.status(200).json({
      success: true,
      data: {
        ...cart._doc,
        items: populateCartItems,
      },
    });
  } catch (error) {
    if(error instanceof Error){
    res.status(500).json({
      success: false,
      message: error.message,
    });}
    else{
       res.status(500).json({
      success: false,
      message: "Something Went Wrong",
    });
    }
  }
};

const updateCartItemQuantity = async (req:Request<{}, {}, CartItemRequest>, res:Response):Promise<void> => {
  try {
    const { userId, productId, quantity } = req.body;
    if (!userId || !productId || quantity <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid Data provided",
      });
    }

    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "No Cart Found",
      });
    }
    const findCurrentProductIndex = cart.items.findIndex(
      (item) => item.productId.toString() === productId,
    );
    if (findCurrentProductIndex ===-1) {
      return res.status(404).json({
        success: false,
        message: "No product Found",
      });
    }
    cart.items[findCurrentProductIndex].quantity=quantity
    await cart.save();
    await cart.populate({
      path: "items.productId",
      select: "image title price salePrice",
    });
    const populateCartItems = cart?.items.map((item) => ({
      productId: item.productId?._id || null,
      image: item.productId?.image || null,
      title: item.productId?.title || null,
      price: item.productId?.price || null,
      salePrice: item.productId?.salePrice || null,
      quantity: item.quantity,
    }));
    res.status(200).json({
      success: true,
      data: {
        ...cart._doc,
        items: populateCartItems,
      },
    });
  }
  catch (error) {
    if(error instanceof Error){
    res.status(500).json({
      success: false,
      message: error.message,
    });}
    else{
       res.status(500).json({
      success: false,
      message: "Something Went Wrong",
    });
    }
  }
};

const deleteCartItem = async (req:Request<DeleteCartItemParams>, res:Response):Promise<void> => {
  try {
    const { userId, productId } = req.params;
    console.log(userId,productId,"userID productid deletecart")
    if (!userId || !productId) {
      return res.status(400).json({
        success: false,
        message: "Invalid Data provided",
      });
    }

    const cart = await Cart.findOne({ userId })
        console.log("cart found:", cart);  

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "No Cart Found ",
      });
    }

    cart.items = cart?.items?.filter(
      (item) => item.productId.toString() !== productId,
    );
    await cart.save();
    await cart.populate({
      path: "items.productId",
      select: "image title price salePrice",
    });
    const populateCartItems = cart?.items.map((item) => ({
      productId:item.productId ? item.productId?._id : null,
      image: item.productId?.image || null,
      title: item.productId?.title || null,
      price: item.productId?.price || null,
      salePrice: item.productId?.salePrice || null,
      quantity: item.quantity,
    }));
    res.status(200).json({
      success: true,
      data: {
        ...cart._doc,
        items: populateCartItems,
      },
    });
  } 
 catch (error) {
    if(error instanceof Error){
    res.status(500).json({
      success: false,
      message: error.message,
    });}
    else{
       res.status(500).json({
      success: false,
      message: "Something Went Wrong",
    });
    }
  }
};

export { addToCart, fetchCartItems, updateCartItemQuantity, deleteCartItem };
