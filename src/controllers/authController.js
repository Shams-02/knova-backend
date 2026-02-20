// src/controllers/authController.js
import authService from '../services/authService.js';
import { generateToken } from '../utils/jwtUtils.js';

const register = async (req, res) => {
  try {
    const { email, password, name } = req.body;
    const user = await authService.register(email, password, name);
    const token = generateToken(user.id, user.role);
    res.status(201).json({ data: { user, token }, message: 'User registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: { message: error.message || 'Failed to register user' } });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await authService.login(email, password);
    const token = generateToken(user.id, user.role);
    res.status(200).json({ data: { user, token }, message: 'User logged in successfully' });
  } catch (error) {
    console.error(error);
    res.status(401).json({ error: { message: error.message || 'Invalid credentials' } });
  }
};

const getMe = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await authService.getMe(userId);
    if (!user) {
      return res.status(404).json({ error: { message: 'User not found' } });
    }
    res.status(200).json({ data: user, message: 'User profile retrieved successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: { message: error.message || 'Failed to retrieve user profile' } });
  }
};

export default {
  register,
  login,
  getMe,
};
