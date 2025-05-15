const express = require('express');
const userCtrl = require('../controllers/userController.js');
const auth = require('../middleware/auth');

const router = express.Router();

router.post('/', userCtrl.register);
router.post('/login', userCtrl.login);
router.get('/me', auth.verifyToken, userCtrl.getProfile);

module.exports = router;
