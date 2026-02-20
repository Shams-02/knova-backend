// src/controllers/adminController.js
import adminService from '../services/adminService.js';

const getUsers = async (req, res) => {
  try {
    const { page = 1, limit = 10, filter } = req.query;
    const users = await adminService.getAllUsers(parseInt(page), parseInt(limit), filter);
    res.status(200).json({ data: users, message: 'Users retrieved successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: { message: error.message || 'Failed to retrieve users' } });
  }
};

const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await adminService.getUserById(id);
    if (!user) {
      return res.status(404).json({ error: { message: 'User not found' } });
    }
    res.status(200).json({ data: user, message: 'User retrieved successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: { message: error.message || 'Failed to retrieve user' } });
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { role } = req.body;
    const updatedUser = await adminService.updateUser(id, role);
    if (!updatedUser) {
      return res.status(404).json({ error: { message: 'User not found' } });
    }
    res.status(200).json({ data: updatedUser, message: 'User updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: { message: error.message || 'Failed to update user' } });
  }
};

export default {
  getUsers,
  getUserById,
  updateUser,
};
