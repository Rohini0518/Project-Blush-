import express from 'express';
import { handleImageUpload } from '../../controllers/admin/admin-product-controllers.js'
import { cloudinaryUpload } from '../../helpers/cloudinary.js';

const adminproductsrouter=express.Router();

adminproductsrouter.post('/upload-image',cloudinaryUpload.single('img-file'),handleImageUpload)

export default adminproductsrouter;