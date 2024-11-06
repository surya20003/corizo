let cart = [];
let total = 0;

document.querySelectorAll('.addToCart').forEach(button => {
    button.addEventListener('click', function() {
        const productName = this.parentElement.dataset.name;
        const productPrice = parseFloat(this.parentElement.dataset.price);

        cart.push({ name: productName, price: productPrice });
        total += productPrice;

        document.getElementById('cartCount').textContent = cart.length;
        alert(`${productName} has been added to your cart!`);
    });
});

document.getElementById('cartButton').addEventListener('click', function() {
    const cartModal = document.getElementById('cartModal');
    const cartItems = document.getElementById('cartItems');
    cartItems.innerHTML = '';
    
    cart.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.name} - $${item.price.toFixed(2)}`;
        cartItems.appendChild(li);
    });

    document.getElementById('totalPrice').textContent = `Total: $${total.toFixed(2)}`;
    cartModal.style.display = 'block';
});

document.querySelector('.close').addEventListener('click', function() {
    document.getElementById('cartModal').style.display = 'none';
});

window.onclick = function(event) {
    const cartModal = document.getElementById('cartModal');
    if (event.target === cartModal) {
        cartModal.style.display = 'none';
    }
};
