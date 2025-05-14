// frontend/js/products.js
import { authFetch } from './api.js';

export async function fetchProducts() {
  try {
    const res = await authFetch('/products');
    if (!res.ok) throw new Error('No autorizado o backend fuera de línea');
    const data = await res.json();
    renderProducts(data);
  } catch (err) {
    alert(err.message);
  }
}

function renderProducts(products) {
  const container = document.getElementById('products-list');
  container.innerHTML = '';

  products.forEach(p => {
    container.insertAdjacentHTML('beforeend', `
      <div class="product-item bg-white p-4 rounded-md shadow-md">
        <img src="${p.image || 'https://via.placeholder.com/200'}"
             alt="${p.name}" class="w-full h-48 object-cover rounded-md">
        <h2 class="text-lg font-semibold mt-2">${p.name}</h2>
        <p class="text-gray-600">${p.description || ''}</p>
        <div class="flex justify-between items-center mt-2">
          <span class="text-primary font-bold text-lg">$${p.price}</span>
        </div>
        <div class="flex justify-between items-center mt-2">
          <button onclick="editProduct('${p._id}')" class="text-blue-600 hover:underline">Editar</button>
          <button onclick="deleteProduct('${p._id}')" class="text-red-600 hover:underline">Eliminar</button>
        </div>
      </div>
    `);
  });
}

// Eliminar producto
window.deleteProduct = async function (id) {
  const confirmDelete = confirm('¿Eliminar este producto?');
  if (!confirmDelete) return;

  try {
    const res = await authFetch(`/products/${id}`, { method: 'DELETE' });

    if (!res.ok) throw new Error('Error al eliminar');

    alert('Producto eliminado');
    fetchProducts();
  } catch (err) {
    alert('Error: ' + err.message);
  }
};

// Editar producto (nombre y precio)
window.editProduct = async function (id) {
  try {
    // Obtener los datos actuales del producto
    const res = await authFetch(`/products/${id}`);
    if (!res.ok) throw new Error('No se pudo obtener el producto');
    const producto = await res.json();

    // Preguntar nuevos valores
    const nuevoNombre = prompt('Editar nombre:', producto.name);
    if (!nuevoNombre) return;
    const nuevoPrecio = prompt('Editar precio:', producto.price);
    if (!nuevoPrecio || isNaN(nuevoPrecio)) return alert('Precio inválido');

    // Enviar PATCH
    const actualizar = await authFetch(`/products/${id}`, {
      method: 'PATCH',
      body: JSON.stringify({
        name: nuevoNombre.trim(),
        price: +nuevoPrecio
      })
    });

    if (!actualizar.ok) throw new Error('No se pudo actualizar');
    alert('Producto actualizado');
    fetchProducts();
  } catch (err) {
    alert('Error: ' + err.message);
  }
};


fetchProducts();

// Manejar envío del formulario para agregar producto
document.getElementById('newForm').addEventListener('submit', async e => {
  e.preventDefault(); // evita que recargue la página

  const name  = document.getElementById('nName').value.trim();
  const price = +document.getElementById('nPrice').value;
  const image = document.getElementById('nImg').value.trim();

  if (!name || price <= 0 || !image) {
    alert('Completa todos los campos correctamente');
    return;
  }

  try {
    const res = await authFetch('/products', {
      method: 'POST',
      body: JSON.stringify({ name, price, image })
    });

    if (!res.ok) throw new Error('No se pudo crear el producto');

    alert('Producto creado');
    e.target.reset();     // limpia formulario
    fetchProducts();      // recarga lista

  } catch (err) {
    alert('Error: ' + err.message);
  }
});
