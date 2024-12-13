import ProductModel from '../models/product.js';

class ProductController {
  static async createProduct(request, h) {
    try {
      const { barcode, name, nutrition } = request.payload;

      // Check if product already exists
      const existingProduct = await ProductModel.findByBarcode(barcode);
      if (existingProduct) {
        return h.response({ message: 'Product already exists' }).code(409);
      }

      const product = await ProductModel.create({
        barcode,
        name,
        nutrition
      });

      return h.response({
        message: 'Product added successfully',
        product
      }).code(201);
    } catch (error) {
      console.error(error);
      return h.response({ message: 'Product creation failed' }).code(500);
    }
  }

  static async getAllProducts(request, h) {
    try {
      const products = await ProductModel.getAllProducts();
      return h.response(products);
    } catch (error) {
      console.error(error);
      return h.response({ message: 'Failed to retrieve products' }).code(500);
    }
  }

  static async getProductByBarcode(request, h) {
    try {
      const { barcode } = request.params;

      const product = await ProductModel.findByBarcode(barcode);
      if (!product) {
        return h.response({ message: 'Product not found' }).code(404);
      }

      return h.response(product);
    } catch (error) {
      console.error(error);
      return h.response({ message: 'Failed to retrieve product' }).code(500);
    }
  }

  static async updateProduct(request, h) {
    try {
      const { barcode } = request.params;
      const updateData = request.payload;

      await ProductModel.updateByBarcode(barcode, updateData);

      return h.response({ message: 'Product updated successfully' });
    } catch (error) {
      console.error(error);
      return h.response({ message: 'Product update failed' }).code(500);
    }
  }

  static async deleteProduct(request, h) {
    try {
      const { barcode } = request.params;

      await ProductModel.deleteByBarcode(barcode);

      return h.response({ message: 'Product deleted successfully' });
    } catch (error) {
      console.error(error);
      return h.response({ message: 'Product deletion failed' }).code(500);
    }
  }
}

export default ProductController;