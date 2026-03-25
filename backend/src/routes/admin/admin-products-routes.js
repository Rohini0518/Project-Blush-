import express from 'express';
import { handleImageUpload, addAdminProduct, getAllAdminProducts, editAdminProduct, deleteAdminProduct   } from '../../controllers/admin/admin-product-controllers.js'
import { cloudinaryUpload } from '../../helpers/cloudinary.js';

const adminproductsrouter=express.Router();

adminproductsrouter.post('/upload-image',cloudinaryUpload.single('img-file'),handleImageUpload)
adminproductsrouter.get('/getProducts',getAllAdminProducts);
adminproductsrouter.post('/addProduct',addAdminProduct);
adminproductsrouter.put('/editProduct/:id',editAdminProduct);
adminproductsrouter.delete('/deleteProduct/:id',deleteAdminProduct);

export default adminproductsrouter;