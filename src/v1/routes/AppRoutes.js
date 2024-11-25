const express = require('express');
const { addApp, getAppWithDetails } = require('../../controllers/AppController');
const { validateAppFieldsApp, upload } = require('../../middlewares/validateAppFields');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: App
 *   description: Rutas relacionadas con los Apps.
 */

/**
 * @swagger
 * /app/consult:
 *   get:
 *     summary: Obtiene todos las Apps
 *     tags: 
 *       - App
 *     description: Devuelve una lista de todos las Apps disponibles.
 *     responses:
 *       200:
 *         description: Lista de Apps obtenida exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: Success
 *                 message:
 *                   type: string
 *                   example: Applications
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       appkey:
 *                         type: integer
 *                         example: 1
 *                       image:
 *                         type: string
 *                         example: "https://example.com/image.jpg"
 *                       name:
 *                         type: string
 *                         example: AppLiverpool
 *                       description:
 *                         type: string
 *                         example: Prueba
 *                       url:
 *                         type: string
 *                         example: "https://liverrpol.com"
 *                       bussines:
 *                         type: string
 *                         example: Zapateria
 *                       AppMethodAccesses:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             methodKey:
 *                               type: integer
 *                               example: 1
 *                             methods:
 *                               type: object
 *                               properties:
 *                                 method_id:
 *                                   type: integer
 *                                   example: 1
 *                                 method_name:
 *                                   type: string
 *                                   example: Web
 *                       apptags:
 *                         type: array
 *                         items:
 *                           type: object
 *                       appresponsables:
 *                         type: array
 *                         items:
 *                           type: object
 *       204:
 *         description: No existe lista de Métodos de acceso. Solicite llenar el catálogo.
 *       400:
 *         description: Error en la solicitud; se envió mal un campo o hubo un fallo en el consumo. Contacte al equipo de backend.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: Failed
 *                 error:
 *                   type: string
 *                   example: Error en la solicitud
 *       500:
 *         description: Error interno del servidor. Contacte al equipo de backend.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: Failed
 *                 error:
 *                   type: string
 *                   example: Error interno del servidor
 * 
 * /app/create:
 *  post:
 *     summary: Crea una nueva app
 *     tags: 
 *       - App
 *     description: Metodo para crear una nueva app
 */
router
    .post('/create', upload.single('image'), validateAppFieldsApp, addApp)
    .get('/consult', getAppWithDetails)


module.exports = router;    