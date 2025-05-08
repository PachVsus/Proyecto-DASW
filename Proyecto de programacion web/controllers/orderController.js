const Order = require('../models/Order');

exports.createOrder = async (req, res) => {
  const { products, total } = req.body;
  try {
    const order = new Order({
      userId: req.user.id,
      products,
      total
    });
    await order.save();
    res.status(201).json(order);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user.id }).populate('products');
    res.json(orders);
  } catch {
    res.status(500).json({ message: 'Error al obtener las órdenes' });
  }
};

exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate('products');
    if (!order) return res.status(404).json({ message: 'Orden no encontrada' });
    if (order.userId.toString() !== req.user.id) return res.status(403).json({ message: 'Acceso denegado' });
    res.json(order);
  } catch {
    res.status(400).json({ message: 'ID inválido' });
  }
};
