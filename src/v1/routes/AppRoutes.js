const express = require('express');
const { addApp, deleteApp, updateApp, getAppWithDetails } = require('../../controllers/AppController');
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
 *     summary: Obtiene todas las Apps
 *     tags: 
 *       - App
 *     description: Devuelve una lista de todas las Apps disponibles junto con sus detalles relacionados.
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
 *                         example: 2
 *                       image:
 *                         type: string
 *                         example: "https://example.com/image.jpg"
 *                       name:
 *                         type: string
 *                         example: AppSuburbia
 *                       description:
 *                         type: string
 *                         example: Prueba
 *                       url:
 *                         type: string
 *                         example: "\"https://liverrpol.com\""
 *                       AppBussinesses:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             bussinessKey:
 *                               type: integer
 *                               example: 2
 *                             bussines:
 *                               type: object
 *                               properties:
 *                                 bussiness_id:
 *                                   type: integer
 *                                   example: 1
 *                                 bussiness_name:
 *                                   type: string
 *                                   example: Liverpool
 *                       AppMethodAccesses:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             methodKey:
 *                               type: integer
 *                               example: 4
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
 *                           properties:
 *                             tagKey:
 *                               type: integer
 *                               example: 1
 *                             tags:
 *                               type: object
 *                               properties:
 *                                 tag_id:
 *                                   type: integer
 *                                   example: 3
 *                                 name:
 *                                   type: string
 *                                   example: zapateria
 *                       appresponsables:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             responsableKey:
 *                               type: integer
 *                               example: 3
 *                             responsablesa:
 *                               type: object
 *                               properties:
 *                                 responsable_id:
 *                                   type: integer
 *                                   example: 3
 *                                 name:
 *                                   type: string
 *                                   example: Juana
 *                                 email:
 *                                   type: string
 *                                   example: rfercho180@gmail.com
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
 *   post:
 *     summary: Crea una nueva app
 *     tags: 
 *       - App
 *     description: Método para crear una nueva app con los datos proporcionados.
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: Archivo de imagen para la app.
 *               name:
 *                 type: string
 *                 description: Nombre de la app.
 *                 example: MiAplicacion
 *               description:
 *                 type: string
 *                 description: Breve descripción de la app.
 *                 example: Una aplicación para gestionar inventarios.
 *               methodsAccess:
 *                 type: string
 *                 description: Métodos de acceso para la app.
 *                 example: '[{"id":1,"method":"Web"}]'
 *               url:
 *                 type: string
 *                 format: uri
 *                 description: URL de la app.
 *                 example: https://miaplicacion.com
 *               bussiness:
 *                 type: string
 *                 description: Tipo de negocio al que pertenece la app.
 *                 example: '[{"id":1,"bussiness":"Liverpool"}]'
 *               tags:
 *                 type: string
 *                 description: Tags relacionados con la app (separados por comas).
 *                 example: '[{"id":null,"nametag":"zapateria"}, {"id": null, "nametag": "Vesturia"}]'
 *               responsables:
 *                 type: string
 *                 description: Responsables de la app (JSON string o texto).
 *                 example: '[{"name":"Juana", "email": "rfercho180@gmail.com"},{"name":"Sebastian", "email": "rfercho180@gmail.com"}]'
 *     responses:
 *       201:
 *         description: Aplicación creada exitosamente.
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
 *                   example: Aplicación creada exitosamente
 *                 data:
 *                   type: object
 *                   properties:
 *                     updated_at:
 *                       type: string
 *                       format: date-time
 *                       example: "2024-11-25T22:13:30.476Z"
 *                     created_at:
 *                       type: string
 *                       format: date-time
 *                       example: "2024-11-25T22:13:30.476Z"
 *                     id:
 *                       type: integer
 *                       example: 36
 *                     imageurlapp:
 *                       type: string
 *                       example: 1732551210476-creador.jpg
 *                     nameapp:
 *                       type: string
 *                       example: AppSuburbia
 *                     descriptionapp:
 *                       type: string
 *                       example: Prueba
 *                     statusapp:
 *                       type: integer
 *                       example: 1
 *                     urlapp:
 *                       type: string
 *                       example: "https://liverrpol.com"
 *       400:
 *         description: Error en la solicitud, datos incorrectos o fallo en la validación.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: Faild
 *                 error:
 *                   type: string
 *                   example: "Error en la solicitud: Invalid fields provided"
 *       500:
 *         description: Error interno del servidor.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: Faild
 *                 error:
 *                   type: string
 *                   example: "Error interno del servidor: Database connection failed"
 * /app/delete/{id}:
 *   delete:
 *     summary: Se aplica un soft delete a una app
 *     tags: 
 *       - App
 *     description: Método para realizar un borrado temporal de la app especificada.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la app que se desea borrar.
 *     responses:
 *       200:
 *         description: Respuesta exitosa indicando si la app fue eliminada o no encontrada.
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
 *                   example: App deleted
 *       400:
 *         description: Error en la solicitud, datos incorrectos o fallo en la validación.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: Faild
 *                 error:
 *                   type: string
 *                   example: Error en la solicitud
 *       500:
 *         description: Error interno del servidor.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: Faild
 *                 error:
 *                   type: string
 *                   example: Error interno del servidor
 * /app/update:
 *  put:
 *     summary: Se aplica un update a la app
 *     tags: 
 *       - App
 *     description: Método para realizar un update al servicio de la app
 */
router
    .post('/create', upload.single('image'), validateAppFieldsApp, addApp)
    .get('/consult', getAppWithDetails)
    .delete('/delete/:id', deleteApp)
    .put('/update/:id', upload.single('image'), validateAppFieldsApp, updateApp)


module.exports = router;    