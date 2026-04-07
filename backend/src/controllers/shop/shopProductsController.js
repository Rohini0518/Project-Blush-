import AdminProducts from "../../models/admin/adminProductModel.js";

const getfilterProducts = async (req, res) => {
  try {
    const { category = "", size = "", sortBy = "price-lowtohigh" } = req.query;
    let filters = {};
    if (category.length) {
      filters.category = { $in: category.split(",") };
    }
    if (size.length) {
      filters.size = { $in: size.split(",") };
    }
    // for example from cilent we get if both category and size there..
    // --- >   filters = {
    //   category: { $in: ["electronics", "clothing"] },
    //   size: { $in: ["nike", "puma"] }
    // };
    let sortOption = {
      "price-lowtohigh": { salePrice: 1 },
      "price-hightolow": { salePrice: -1 },
      "title-atoz": { title: 1 },
      "title-ztoa": { title: -1 },
    };
    console.log(sortOption[sortBy], sortBy, size, "cate", category);

    let query = AdminProducts.find(filters);
    if (sortBy && sortOption[sortBy]) {
      query = query.sort(sortOption[sortBy]);
      console.log(query);
    }

    const products = await query;
    if (!products.length) {
      return res.status(400).json({
        success: false,
        message: "No Products FOund",
      });
    }
    return res.status(200).json({
      success: true,
      data: products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getProductDetails=async(req,res)=>{
const { id } = req.params;
  try{
const product=await AdminProducts.findById(id)
 if (!product) {
      return res.status(400).json({
        success: false,
        message: "No Product ",
      });
    }
    return res.status(200).json({
      success:true,
      data:product
    })
  }
 catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}
export { getfilterProducts ,getProductDetails};
