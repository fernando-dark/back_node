const express = require('express');
const router = express.Router();

const MethodAccessController = require('../../controllers/MethodAccessController');

/**
 * @swagger
 * tags:
 *   name: Catalogs
 *   description: Rutas relacionadas con los Metodos de acceso.
 */

/**
 * @swagger
 * /access-method/consult:
 *   get:
 *     summary: Obtiene todos los Métodos de Acceso
 *     tags: 
 *       - Catalogs
 *     description: Devuelve una lista de todos los Métodos de acceso, como "App" o "Web", disponibles.
 *     responses:
 *       200:
 *         description: Lista de métodos de acceso obtenida exitosamente.
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
 *                   example: Found Methods Access
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 1
 *                       name:
 *                         type: string
 *                         example: App
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
 */
router
    .get('/consult', MethodAccessController.getAllMethodAccess)




module.exports = router; 