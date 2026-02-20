// src/controllers/courseController.js
import courseService from '../services/courseService.js';

const getCourses = async (req, res) => {
  try {
    const courses = await courseService.getAllCourses();
    res.status(200).json({ data: courses, message: 'Courses retrieved successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: { message: error.message || 'Failed to retrieve courses' } });
  }
};

const getCourseById = async (req, res) => {
  try {
    const { id } = req.params;
    const course = await courseService.getCourseById(id);
    if (!course) {
      return res.status(404).json({ error: { message: 'Course not found' } });
    }
    res.status(200).json({ data: course, message: 'Course retrieved successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: { message: error.message || 'Failed to retrieve course' } });
  }
};

export default {
  getCourses,
  getCourseById,
};
