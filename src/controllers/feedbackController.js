// src/controllers/feedbackController.js
import feedbackService from '../services/feedbackService.js';

const createFeedback = async (req, res) => {
  try {
    const { type, message, userName, userEmail } = req.body;
    const userId = req.user ? req.user.id : null;
    const userAgent = req.headers['user-agent'];

    const feedback = await feedbackService.createFeedback(userId, userName, userEmail, type, message, userAgent);
    res.status(201).json({ data: feedback, message: 'Feedback submitted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: { message: error.message || 'Failed to submit feedback' } });
  }
};

const getFeedback = async (req, res) => {
  try {
    const { status, page = 1, limit = 10 } = req.query;
    const feedback = await feedbackService.getAllFeedback(status, parseInt(page), parseInt(limit));
    res.status(200).json({ data: feedback, message: 'Feedback retrieved successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: { message: error.message || 'Failed to retrieve feedback' } });
  }
};

const getFeedbackById = async (req, res) => {
  try {
    const { id } = req.params;
    const feedback = await feedbackService.getFeedbackById(id);
    if (!feedback) {
      return res.status(404).json({ error: { message: 'Feedback not found' } });
    }
    res.status(200).json({ data: feedback, message: 'Feedback retrieved successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: { message: error.message || 'Failed to retrieve feedback' } });
  }
};

const updateFeedbackStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const updatedFeedback = await feedbackService.updateFeedbackStatus(id, status);
    if (!updatedFeedback) {
      return res.status(404).json({ error: { message: 'Feedback not found' } });
    }
    res.status(200).json({ data: updatedFeedback, message: 'Feedback status updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: { message: error.message || 'Failed to update feedback status' } });
  }
};

export default {
  createFeedback,
  getFeedback,
  getFeedbackById,
  updateFeedbackStatus,
};
