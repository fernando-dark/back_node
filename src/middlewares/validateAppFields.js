const { body, validationResult } = require('express-validator');
const multer = require('multer');

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 },
});

// Middleware para validar los campos del body
const validateAppFieldsApp = [
  body('name').notEmpty().withMessage('El campo nombre es requerido'),
  body('description').notEmpty().withMessage('El campo Descripcion es requerido'),
  body('url').notEmpty().withMessage('El campo URL es requerido'),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: 'Error en los campos de la solicitud',
        errors: errors.array(),
      });
    }
    next();
  },

  (req, res, next) => {
    if (!req.file) {
      return res.status(400).json({
        message: 'Error en los campos de la solicitud',
        errors: [{ msg: 'El campo Foto es requerido', param: 'image', location: 'body' }],
      });
    }
    next();
  },
];

module.exports = { validateAppFieldsApp, upload };
