import express from 'express';
import  {getfilterProducts} from '../../controllers/shop/shopProductsController.js';



const shoprouter=express.Router();

shoprouter.get("/get",getfilterProducts)

export default shoprouter;