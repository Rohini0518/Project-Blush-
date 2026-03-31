import { AdminProduct } from "../../models/admin/adminProductModel";

const getfilterProducts = async (req, res) => {
  try {
    const products = await AdminProduct.find({});
    if (!products) {
      res.status(400).json({
        success: false,
        message: "No Products FOund",
      });
    }

    res.status(200).json({
      success: true,
      data: products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error Occured server side",
    });
  }
};

export { getfilterProducts };
