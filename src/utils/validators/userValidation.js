import Joi from 'joi';

const registerSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  name: Joi.string().required()
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required()
});

const updateUserSchema = Joi.object({
    name: Joi.string(),
    role: Joi.string().valid('USER', 'ADMIN', 'SUPERADMIN')
});

export { registerSchema, loginSchema, updateUserSchema };