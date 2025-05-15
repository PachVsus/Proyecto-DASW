import express from 'express';
import userCtrl from '../controllers/userController.js';

const router = express.Router();

// Rutas de autenticación
router.post('/', userCtrl.register);
router.post('/login', userCtrl.login);

// Aquí puedes agregar rutas protegidas si quieres probar
// router.get('/privado', auth.verifyToken, (req, res) => res.send('Autenticado'));

export default router;

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Operaciones sobre usuarios
 */

/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: Crear un nuevo usuario
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               role:
 *                 type: string
 *                 enum: [admin, client]
 *     responses:
 *       201:
 *         description: Usuario creado exitosamente
 */
router.post('/', userCtrl.register);

/**
 * @swagger
 * /api/users/login:
 *   post:
 *     summary: Iniciar sesión y obtener token JWT
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Token JWT entregado
 */
router.post('/login', userCtrl.login);
