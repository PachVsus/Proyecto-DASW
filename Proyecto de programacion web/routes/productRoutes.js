const express = require('express');
const router = express.Router();
const productCtrl = require('../controllers/productController');
const auth = require('../middleware/auth');

/**
 * @swagger
 * tags:
 *   name: Products
 *   description: Operaciones sobre productos
 */

/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Listar todos los productos
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: Lista de productos
 */
router.get('/', productCtrl.getAllProducts);

/**
 * @swagger
 * /api/products/{id}:
 *   get:
 *     summary: Obtener un producto por ID
 *     tags: [Products]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Producto encontrado
 *       404:
 *         description: Producto no encontrado
 */
router.get('/:id', productCtrl.getProductById);

/**
 * @swagger
 * /api/products:
 *   post:
 *     summary: Crear un producto (solo admin)
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name: { type: string }
 *               description: { type: string }
 *               price: { type: number }
 *               stock: { type: number }
 *               category: { type: string }
 *     responses:
 *       201:
 *         description: Producto creado
 */
router.post('/', auth.verifyToken, auth.isAdmin, productCtrl.createProduct);

/**
 * @swagger
 * /api/products/{id}:
 *   put:
 *     summary: Actualizar un producto (solo admin)
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema: { type: string }
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name: { type: string }
 *               description: { type: string }
 *               price: { type: number }
 *               stock: { type: number }
 *               category: { type: string }
 *     responses:
 *       200:
 *         description: Producto actualizado
 */
router.put('/:id', auth.verifyToken, auth.isAdmin, productCtrl.updateProduct);

/**
 * @swagger
 * /api/products/{id}:
 *   delete:
 *     summary: Eliminar un producto (solo admin)
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: Producto eliminado
 */
router.delete('/:id', auth.verifyToken, auth.isAdmin, productCtrl.deleteProduct);

module.exports = router;
