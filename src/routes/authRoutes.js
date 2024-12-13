import AuthControllers from '../controllers/authControllers.js';
import Joi from 'joi';

const authRoutes = [
  {
    method: 'POST',
    path: '/api/v1/register',
    handler: AuthControllers.register,
    options: {
      validate: {
        payload: Joi.object({
          name: Joi.string().required(),
          email: Joi.string().email().required(),
          password: Joi.string().min(6).required()
        })
      }
    }
  },
  {
    method: 'POST',
    path: '/api/v1/login',
    handler: AuthControllers.login,
    options: {
      validate: {
        payload: Joi.object({
          email: Joi.string().email().required(),
          password: Joi.string().required()
        })
      }
    }
  }
];

export default authRoutes;