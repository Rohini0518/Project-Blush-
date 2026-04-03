import AdminProducts from "../../models/admin/adminProductModel.js";

const getfilterProducts = async (req, res) => {
  try {
    const { category = [], brand = [], sortBy = "price-lowtohigh" } = req.query;
    let filters = {};
    if (category.length) {
      filters.category = { $in: category.split(",") };
    }
    if (brand.length) {
      filters.brand = { $in: brand.split(",") };
    }
    
     let sortOption = {
      "price-lowtohigh": { price: 1 },
      "price-hightolow": { price: -1 },
      "title-atoz": { title: 1 },
      "title-ztoa": { title: -1 },
    };

    const products = (await AdminProducts.find(filters)).sort(sortOption[sortBy] || { price: 1 });
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
