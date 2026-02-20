// src/middleware/validationMiddleware.js

const validate = (schema) => async (req, res, next) => {
  try {
    await schema.validate({
      body: req.body,
      query: req.query,
      params: req.params,
    }, { abortEarly: false }); // abortEarly: false to return all errors
    return next();
  } catch (err) {
    const errors = err.errors.map((error) => ({ message: error }));
    return res.status(400).json({ error: { message: 'Validation error', errors: errors, code: 'VALIDATION_ERROR' } });
  }
};

export default validate;
