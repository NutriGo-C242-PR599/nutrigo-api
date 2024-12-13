import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';
import firestore from '../config/firestore.js';

const USERS_COLLECTION = 'users';

class UserModel {
  static async create(userData) {
    const userId = uuidv4();
    const hashedPassword = await bcrypt.hash(userData.password, 10);

    const userDoc = {
      id: userId,
      name: userData.name,
      email: userData.email,
      password: hashedPassword,
      role: userData.role || 'user',
      createdAt: new Date(),
      updatedAt: new Date()
    };

    await firestore.collection(USERS_COLLECTION).doc(userId).set(userDoc);
    return userDoc;
  }

  static async findByEmail(email) {
    const snapshot = await firestore
      .collection(USERS_COLLECTION)
      .where('email', '==', email)
      .get();

    return snapshot.empty ? null : snapshot.docs[0].data();
  }

  static async findById(userId) {
    const doc = await firestore.collection(USERS_COLLECTION).doc(userId).get();
    return doc.exists ? doc.data() : null;
  }

  static async update(userId, updateData) {
    await firestore.collection(USERS_COLLECTION).doc(userId).update({
      ...updateData,
      updatedAt: new Date()
    });
  }

  static async delete(userId) {
    await firestore.collection(USERS_COLLECTION).doc(userId).delete();
  }
}

export default UserModel;