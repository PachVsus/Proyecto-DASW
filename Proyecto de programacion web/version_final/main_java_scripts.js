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
toggleSearchBar();
function setupSearchFunctionality() {
    document.getElementById("search").addEventListener("input", function () {
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

document.addEventListener("DOMContentLoaded", () => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    updateCartCount();

    document.querySelectorAll(".add-to-cart").forEach((button, index) => {
        button.addEventListener("click", () => {
            const productItem = button.closest(".product-card, .product-item");
            const productName = productItem.querySelector("h2").textContent.trim();
            const productPrice = productItem.querySelector("span").textContent.trim();
            const productImage = productItem.querySelector("img").src;

            const product = {
                id: Date.now(),
                name: productName,
                price: productPrice,
                image: productImage,
                quantity: 1
            };

            cart.push(product);
            localStorage.setItem("cart", JSON.stringify(cart));
            updateCartCount();

            Swal.fire({
                icon: 'success',
                title: 'Producto añadido',
                text: `"${productName}" se ha agregado al carrito.`,
                timer: 1500,
                showConfirmButton: false
            });
        });
    });

    function updateCartCount() {
        const count = JSON.parse(localStorage.getItem("cart"))?.length || 0;
        const badge = document.getElementById("cart-count");
        if (badge) badge.textContent = count;
    }
});
