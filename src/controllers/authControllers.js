import UserModel from '../models/user.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

class AuthControllers {
  static async register(request, h) {
    try {
      const { name, email, password } = request.payload;

      // Check if user already exists
      const existingUser = await UserModel.findByEmail(email);
      if (existingUser) {
        return h.response({ message: 'User already exists' }).code(409);
      }

      // Create new user
      const user = await UserModel.create({ name, email, password });

      // Generate JWT token
      const token = jwt.sign(
        { id: user.id, email: user.email, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );

      return h.response({
        message: 'User registered successfully',
        token,
        user: { id: user.id, name: user.name, email: user.email, role: user.role }
      }).code(201);
    } catch (error) {
      console.error(error);
      return h.response({ message: 'Registration failed' }).code(500);
    }
  }

  static async login(request, h) {
    try {
      const { email, password } = request.payload;

      // Find user by email
      const user = await UserModel.findByEmail(email);
      if (!user) {
        return h.response({ message: 'Invalid credentials' }).code(401);
      }

      // Verify password
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return h.response({ message: 'Invalid credentials' }).code(401);
      }

      // Generate JWT token
      const token = jwt.sign(
        { id: user.id, email: user.email, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );

      return h.response({
        message: 'Login successful',
        token,
        user: { id: user.id, name: user.name, email: user.email, role: user.role }
      });
    } catch (error) {
      console.error(error);
      return h.response({ message: 'Login failed' }).code(500);
    }
  }
}

export default AuthControllers;