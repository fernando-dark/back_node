const express = require('express');
const { searchSubdivision } = require('../../controllers/SubdivisionController');
const { validateSearch } = require('../../middlewares/validateAppFields');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Catalogs
 *   description: Obtener las subdivisiones
 */

/**
 * @swagger
 * /subdivision/search:
 *   post:
 *     summary: Obtiene las subdivisiones
 *     tags: 
 *       - Catalogs
 *     description: Devuelve una lista de las coincidencias encontradas de ssubdivisiones
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               search:
 *                 type: string
 *                 example: "ZN07"
 *     responses:
 *       200:
 *         description: Lista de subdivisiones exitosamente
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
 *                   example: Found societies
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 2
 *                       subid:
 *                         type: string
 *                         example: "ZN07"
 *                       sub:
 *                         type: string
 *                         example: Golfo
 *                       updated_at:
 *                         type: string
 *                         format: date-time
 *                         example: "2024-11-26T03:10:24.956Z"
 *                       created_at:
 *                         type: string
 *                         format: date-time
 *                         example: "2024-11-26T03:10:24.956Z"
 *       204:
 *         description: No existe coincidencias con el valor buscado
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
 */
router
    .post('/search', validateSearch, searchSubdivision)


module.exports = router;    