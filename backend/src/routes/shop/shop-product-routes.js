import express from 'express';
import  {getfilterProducts, getProductDetails} from '../../controllers/shop/shopProductsController.js';



const shoprouter=express.Router();

shoprouter.get("/get",getfilterProducts);
shoprouter.get("/get/:id",getProductDetails)

export default shoprouter;