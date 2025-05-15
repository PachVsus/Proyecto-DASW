const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// Función para registrar usuario
const register = async (req, res) => {
  const { name, email, password } = req.body; // No aceptar role del cliente

  try {
    // Verificar si ya existe el usuario
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'El usuario ya existe' });
    }

    // Hashear la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear nuevo usuario (role por defecto: 'user')
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role: 'user'
    });

    await newUser.save();

    // Generar token tras registro
    const token = jwt.sign(
      {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email
      },
      process.env.JWT_SECRET || 'mi_clave_secreta',
      { expiresIn: '1h' }
    );

    res.status(201).json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error al registrar usuario' });
  }
};

// Función para iniciar sesión
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Usuario no encontrado' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Contraseña incorrecta' });
    }

    const token = jwt.sign(
      {
        id: user._id, // debe ser _id
        name: user.name,
        email: user.email
      },
      process.env.JWT_SECRET || 'mi_clave_secreta', // valor por defecto si no está en .env
      { expiresIn: '1h' }
    );

    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error al iniciar sesión' });
  }
};

// Obtener perfil del usuario autenticado
const getProfile = async (req, res) => {
  try {
    // El middleware de autenticación debe poner req.user
    const user = await User.findById(req.user.id).select('-password');
    if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener perfil' });
  }
};

// Exportar funciones
module.exports = { register, login, getProfile };
