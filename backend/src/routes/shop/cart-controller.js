 

 const addToCart=async (req,res)=>{
    try{

    }
    catch (error) {
    res.status(500).json({ 
      success: false,
      message: error.message,
    });
  }
 }

  const fetchCartItems=async (req,res)=>{
    try{

    }
    catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
 }

  const updateCartIteQuantity=async (req,res)=>{
    try{

    }
    catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
 }

  const deleteCartItem=async (req,res)=>{
    try{

    }
    catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
 }


 export {addToCart,fetchCartItems,updateCartIteQuantity,deleteCartItem}