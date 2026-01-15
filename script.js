localStorage.removeItem("cart");
localStorage.removeItem("voucher");

let cart = JSON.parse(localStorage.getItem("cart")) || [];

function addToCart(name, price) {
    const item = cart.find(p => p.name === name);

    if (item) {
        item.quantity += 1;
    } else {
        cart.push({ name, price, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    localStorage.setItem("voucher", true);
    updateCartCounter();
    alert("Added to cart!");
}

function updateCartCounter() {
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    const counter = document.getElementById("cart-count");
    if (counter) counter.innerText = count;
}

function loadCart() {
    const container = document.getElementById("cart-items");
    if (!container) return;

    if (cart.length === 0) {
        container.innerHTML = "<p>Your cart is empty.</p>";
        return;
    }

    container.innerHTML = "";
    cart.forEach(item => {
        container.innerHTML += `
            <div class="cart-item">
                <h3>${item.name}</h3>
                <p>₱${item.price}</p>
                <p>Quantity: ${item.quantity}</p>
                <p>Total: ₱${item.price * item.quantity}</p>
            </div>
        `;
    });

    if (localStorage.getItem("voucher")) {
        document.getElementById("voucher").innerText =
            "Voucher Applied: ₱100 OFF 🎟";
    }
}

function checkout() {
    localStorage.clear();
    window.location.href = "checkout.html";
}

updateCartCounter();
loadCart();
