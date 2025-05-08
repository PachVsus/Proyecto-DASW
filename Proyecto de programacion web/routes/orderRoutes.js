const express = require('express');
const router = express.Router();
const orderCtrl = require('../controllers/orderController');
const auth = require('../middleware/auth');

/**
 * @swagger
 * tags:
 *   name: Orders
 *   description: Operaciones sobre órdenes de compra
 */

/**
 * @swagger
 * /api/orders:
 *   post:
 *     summary: Crear una nueva orden (usuario autenticado)
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               products:
 *                 type: array
 *                 items:
 *                   type: string
 *               total:
 *                 type: number
 *     responses:
 *       201:
 *         description: Orden creada
 */
router.post('/', auth.verifyToken, orderCtrl.createOrder);

/**
 * @swagger
 * /api/orders:
 *   get:
 *     summary: Obtener todas las órdenes del usuario
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de órdenes
 */
router.get('/', auth.verifyToken, orderCtrl.getUserOrders);

/**
 * @swagger
 * /api/orders/{id}:
 *   get:
 *     summary: Obtener una orden por ID (solo si pertenece al usuario)
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: Orden encontrada
 *       403:
 *         description: Acceso denegado
 *       404:
 *         description: Orden no encontrada
 */
router.get('/:id', auth.verifyToken, orderCtrl.getOrderById);

module.exports = router;
