// JavaScript for E-Commerce Site

const cart = []; // Array to store cart items
const cartItemsContainer = document.querySelector('.cart-items');
const cartTotalElement = document.querySelector('.cart-total');
const cartEmptyMessage = document.querySelector('.cart-container p');

// Function to update the cart display
function updateCartDisplay() {
    // Clear existing cart items
    cartItemsContainer.innerHTML = '';

    if (cart.length === 0) {
        cartEmptyMessage.style.display = 'block';
        cartTotalElement.textContent = 'Total: $0.00';
        return;
    }

    cartEmptyMessage.style.display = 'none';
    let total = 0;

    cart.forEach((item, index) => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            <span>${item.name}</span>
            <span>$${item.price.toFixed(2)}</span>
            <button class="remove-item" data-index="${index}">Retirer</button>
        `;
        cartItemsContainer.appendChild(listItem);
        total += item.price;
    });

    cartTotalElement.textContent = `Total: $${total.toFixed(2)}`;

    // Add event listeners for remove buttons
    document.querySelectorAll('.remove-item').forEach(button => {
        button.addEventListener('click', (e) => {
            const index = e.target.getAttribute('data-index');
            removeFromCart(index);
        });
    });
}

// Function to add items to the cart
function addToCart(name, price) {
    cart.push({ name, price });
    updateCartDisplay();
}

// Function to remove items from the cart
function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartDisplay();
}

// Add event listeners to "Add to Cart" buttons
const addToCartButtons = document.querySelectorAll('.add-to-cart');
addToCartButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        const productCard = e.target.closest('.product-card');
        const name = productCard.querySelector('h3').textContent;
        const price = parseFloat(productCard.querySelector('p').textContent.replace('$', ''));
        addToCart(name, price);
    });
});
