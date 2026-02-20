// src/middleware/authorizationMiddleware.js

const authorize = (roles = []) => {
  if (typeof roles === 'string') {
    roles = [roles];
  }

  return [
    (req, res, next) => {
      if (!req.user || !roles.length) {
        return next();
      }

      if (roles.length && !roles.includes(req.user.role)) {
        return res.status(403).json({ error: { message: 'Not authorized, insufficient permissions', code: 'INSUFFICIENT_PERMISSIONS' } });
      }

      next();
    },
  ];
};

export default authorize;
