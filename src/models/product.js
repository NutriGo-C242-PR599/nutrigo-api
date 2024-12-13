import { v4 as uuidv4 } from 'uuid';
import firestore from '../config/firestore.js';

const PRODUCTS_COLLECTION = 'products';

class ProductModel {
  static async create(productData) {
    const productDoc = {
      ...productData,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    await firestore.collection(PRODUCTS_COLLECTION).doc(productData.barcode).set(productDoc);
    return productDoc;
  }

  static async getAllProducts() {
    const snapshot = await firestore.collection(PRODUCTS_COLLECTION).get();
    return snapshot.docs.map(doc => doc.data());
  }

  static async findByBarcode(barcode) {
    const doc = await firestore.collection(PRODUCTS_COLLECTION).doc(barcode).get();
    return doc.exists ? doc.data() : null;
  }

  static async updateByBarcode(barcode, updateData) {
    await firestore.collection(PRODUCTS_COLLECTION).doc(barcode).update({
      ...updateData,
      updatedAt: new Date()
    });
  }

  static async deleteByBarcode(barcode) {
    await firestore.collection(PRODUCTS_COLLECTION).doc(barcode).delete();
  }
}

export default ProductModel;