const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path'); // <-- Necesario para rutas absolutas
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger/swagger.js');

const userRoutes = require('./routes/userRoutes.js');
const productRoutes = require('./routes/productRoutes.js');
const orderRoutes = require('./routes/orderRoutes.js');
const verifyRoutes = require('./routes/verifyRoutes.js');

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());

// 🔽 SERVIR CARPETA version_final 🔽
app.use('/version_final', express.static(path.join(__dirname, 'version_final')));

// Rutas API
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/verify', verifyRoutes);

// Documentación Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Conectar a MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/mi_base_datos', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('MongoDB conectado');
}).catch((err) => {
  console.error('Error conectando a MongoDB:', err.message);
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
