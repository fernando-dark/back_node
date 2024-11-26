const express = require('express');
const { searchPersonalArea } = require('../../controllers/PersonalAreaController');
const { validateSearch } = require('../../middlewares/validateAppFields');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Catalogs
 *   description: Obtener las areas del personal
 */

/**
 * @swagger
 * /personal-area/search:
 *   post:
 *     summary: Obtiene las las areas del personal
 *     tags: 
 *       - Catalogs
 *     description: Devuelve una lista de las coincidencias encontradas de areas del personal
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               search:
 *                 type: string
 *                 example: "Demo con Comision"
 *     responses:
 *       200:
 *         description: Lista de areas personales encontradas
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
 *                   example: Found personal Areas
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 2
 *                       area:
 *                         type: string
 *                         example: "60"
 *                       denomination:
 *                         type: string
 *                         example: Demo con Comision
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
    .post('/search', validateSearch, searchPersonalArea)


module.exports = router;    