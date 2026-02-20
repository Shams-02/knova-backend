import Joi from 'joi';

const feedbackSchema = Joi.object({
  type: Joi.string().valid('IMPROVEMENT', 'BUG', 'TECHNICAL').required(),
  message: Joi.string().required(),
  userName: Joi.string().required(),
  userEmail: Joi.string().email().required(),
  userAgent: Joi.string().required()
});

const updateFeedbackStatusSchema = Joi.object({
  status: Joi.string().valid('NEW', 'IN_PROGRESS', 'RESOLVED', 'CLOSED').required()
});

export { feedbackSchema, updateFeedbackStatusSchema };