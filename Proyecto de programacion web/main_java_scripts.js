// General site interactions and dynamic behavior

document.addEventListener("DOMContentLoaded", () => {
    updateCartCount();
    setupSearchFunctionality();
});

// Shopping Cart Functionality
let cartCount = 0;
function addToCart() {
    cartCount++;
    updateCartCount();
    alert("Producto añadido al carrito");
}

function updateCartCount() {
    const cartBadge = document.getElementById("cart-count");
    if (cartBadge) cartBadge.textContent = cartCount;
}

document.querySelectorAll(".buy-button").forEach(button => {
    button.addEventListener("click", addToCart);
});

// Search Functionality
// toggleSearchBar(); // Eliminar o comentar esta línea si no existe la función
function setupSearchFunctionality() {
    const searchInput = document.getElementById("search");
    if (!searchInput) return;
    searchInput.addEventListener("input", function () {
        let searchValue = this.value.toLowerCase();
        document.querySelectorAll(".product-item").forEach(item => {
            let productName = item.querySelector("h3").textContent.toLowerCase();
            item.style.display = productName.includes(searchValue) ? "block" : "none";
        });
    });
}

// Mobile Navigation Toggle
function toggleMobileNav() {
    const navLinks = document.querySelector(".nav-links");
    navLinks.classList.toggle("active");
}

document.getElementById("mobile-nav-toggle")?.addEventListener("click", toggleMobileNav);
