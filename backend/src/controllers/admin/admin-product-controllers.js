import { handleImageUploadUtil } from "../../helpers/cloudinary.js";
import AdminProducts from "../../models/admin/adminProductModel.js";

const handleImageUpload = async (req, res) => {
  try {
    const b64 = Buffer.from(req.file.buffer).toString("base64");
    const url = "data:" + req.file.mimetype + ";base64," + b64;
    const result = await handleImageUploadUtil(url);

    res.json({
      sucess: true,
      result,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "Image Upload Error Occured",
    });
  }
};

//add new product

const addAdminProduct = async (req, res) => {
  try {
    const {
      image, title,
      description,
      category, brand, price,
      salePrice, totalStock,
    } = req.body;

    const createProduct = new AdminProducts({
      image,title,description,
      category,brand, price,
      salePrice, totalStock,
    })

    await createProduct.save();
    res.status(201).json({
      success: true,
      data: createProduct,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

//fetch all products


const getAllAdminProducts = async (req, res) => {
  try {
    const getAllProducts = await AdminProducts.find({});
    res.status(201).json({
      success: true,
      data: getAllProducts,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

//edit product

const editAdminProduct = async (req, res) => {
  try {
  const { id } = req.params;
   const {
      image, title,
      description,
      category, brand, price,
      salePrice, totalStock,
    } = req.body;
  
    const findProduct = await AdminProducts.findById(
      id);
    if (!findProduct) {
     return res.status(404).json({
        success: false,
        message: "product id not found",
      });
    }
    

   findProduct.title = title || findProduct.title;
   findProduct.description = description===""?"NA":description || findProduct.description;
   findProduct.category = category || findProduct.category;
   findProduct.brand = brand || findProduct.brand;
   findProduct.price = price===""?0:price || findProduct.price;
   findProduct.salePrice = salePrice===""?0:salePrice|| findProduct.salePrice;
   findProduct.totalStock = totalStock===""?0:totalStock || findProduct.totalStock;
    findProduct.image = image || findProduct.image;

   await findProduct.save();
   res.status(200).json({
     success: true,
     message: "Product updated successfully",
     data: findProduct,
   });

  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};


//delete product

const deleteAdminProduct= async (req,res)=>{
try {
      const {id}=req.params;
      const deleteProduct = await AdminProducts.findByIdAndDelete(id);
      if (!deleteProduct) {
        return res.status(404).json({
          success: false,
          message: "product id not found",
        });
      }
      await deleteProduct.save();

      res.status(200).json({
        success: true,
        message: "Product deleted successfully",
        data: deleteProduct,
      });
   }
 catch (error) {
  res.json({
    success: false,
    message: error.message,
  });
}

}

export { handleImageUpload, addAdminProduct, getAllAdminProducts, editAdminProduct, deleteAdminProduct  };
