// js/api.js
// URL del backend en Render:
export const API = 'https://ecommerce-api-we8v.onrender.com/api';

// Lee el token JWT que guardó login
export const token = localStorage.getItem('token');

// Encabezados estándar para cada petición (con JWT)
export const headers = {
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${token}`
};

// Helper: authFetch('/products') hace fetch con headers ya puestos
export const authFetch = (url, options = {}) =>
  fetch(API + url, { ...options, headers });
