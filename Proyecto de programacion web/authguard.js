// authGuard.js

// Función para proteger rutas
(function() {
  const token = localStorage.getItem('token');
  
  if (!token) {
    // Si no hay token, redirigir a login
    alert('No has iniciado sesión. Serás redirigido.');
    window.location.href = 'login.html';
  }
})();
