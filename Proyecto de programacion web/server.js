require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger/swagger');

const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');
const verifyRoutes = require('./routes/verifyRoutes');  // <-- Esto aquí está bien

const app = express();  // <-- Esta línea debe estar ANTES de app.use()

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas de tu API
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api', verifyRoutes);  // <-- Aquí ya es seguro

// Documentación Swagger
app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Conexión MongoDB y Levantar Servidor
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB conectado');
    app.listen(process.env.PORT || 5000, () => {
      console.log(`Servidor corriendo en puerto ${process.env.PORT}`);
    });
  })
  .catch(err => console.error('Error de conexión MongoDB:', err));
