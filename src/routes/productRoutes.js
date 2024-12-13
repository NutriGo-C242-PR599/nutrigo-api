import ProductController from '../controllers/productControllers.js';
import Joi from 'joi';

const productRoutes = [
  {
    method: 'GET',
    path: '/api/v1/products',
    handler: ProductController.getAllProducts,
  },
  {
    method: 'POST',
    path: '/api/v1/products',
    handler: ProductController.createProduct,
    options: {
      validate: {
        payload: Joi.object({
          barcode: Joi.string().required(),
          name: Joi.string().required(),
          nutrition: Joi.object({
            energy: Joi.number(),
            total_fat: Joi.number(),
            saturated_fat: Joi.number(),
            carbohydrate: Joi.number(),
            sugar: Joi.number(),
            sodium: Joi.number(),
            protein: Joi.number()
          })
        })
      }
    }
  },
  {
    method: 'GET',
    path: '/api/v1/products/{barcode}',
    handler: ProductController.getProductByBarcode
  },
  {
    method: 'PUT',
    path: '/api/v1/products/{barcode}',
    handler: ProductController.updateProduct,
    options: {
      validate: {
        payload: Joi.object({
          name: Joi.string(),
          nutrition: Joi.object({
            energy: Joi.number(),
            total_fat: Joi.number(),
            saturated_fat: Joi.number(),
            carbohydrate: Joi.number(),
            sugar: Joi.number(),
            sodium: Joi.number(),
            protein: Joi.number()
          })
        })
      }
    }
  },
  {
    method: 'DELETE',
    path: '/api/v1/products/{barcode}',
    handler: ProductController.deleteProduct
  }
];

export default productRoutes;