import express from 'express';
import  getFilterProducts, { getfilterProducts } from '../../controllers/shop/shopProductsController';



const shoprouter=express.Router();

shoprouter.get("/get",getfilterProducts)

export default shoprouter;