let cart = JSON.parse(localStorage.getItem('haveli-cart') || '[]');

const panel = document.getElementById('cartPanel');

function saveCart() {
    localStorage.setItem('haveli-cart', JSON.stringify(cart));
    renderCart();
    updateCartCount();
}

function addToCart(id, qty) {

    const item = cart.find(i => i.id === id);

    if (item) {
        item.qty += qty;
    } else {
        cart.push({
            id,
            qty
        });
    }

    saveCart();

    panel.classList.add('open');
    panel.setAttribute('aria-hidden', 'false');
}

function updateCartCount() {

    document.getElementById('cartCount').textContent =
        cart.reduce((sum, item) => sum + item.qty, 0);
}

function renderCart() {

    const wrap = document.getElementById('cartItems');

    if (!cart.length) {

        wrap.innerHTML = `
            <div style="
                padding:35px 8px;
                text-align:center;
                color:#777;
                font-size:12px;
            ">
                Your cart is waiting for something delicious.
            </div>
        `;

    } else {

        wrap.innerHTML = cart.map(item => {

            const product =
                products.find(p => p.id === item.id);

            if (!product) return '';

            return `
                <div class="cart-item">

                    <img
                        src="${product.image}"
                        alt="${product.name}"
                    >

                    <div>

                        <h4>
                            ${product.name}
                        </h4>

                        <p>
                            ₹${product.price} × ${item.qty}
                        </p>

                        <div class="qty-mini">

                            <button data-dec="${product.id}">
                                −
                            </button>

                            <span>
                                ${item.qty}
                            </span>

                            <button data-inc="${product.id}">
                                +
                            </button>

                        </div>

                    </div>

                    <button
                        style="
                            border:0;
                            background:none;
                            color:#b44;
                            cursor:pointer;
                        "
                        data-remove="${product.id}"
                    >
                        Remove
                    </button>

                </div>
            `;

        }).join('');


        wrap.querySelectorAll('[data-inc]').forEach(button => {

            button.onclick = () => {
                changeQty(
                    Number(button.dataset.inc),
                    1
                );
            };

        });


        wrap.querySelectorAll('[data-dec]').forEach(button => {

            button.onclick = () => {
                changeQty(
                    Number(button.dataset.dec),
                    -1
                );
            };

        });


        wrap.querySelectorAll('[data-remove]').forEach(button => {

            button.onclick = () => {
                removeItem(
                    Number(button.dataset.remove)
                );
            };

        });

    }


    const subtotal = cart.reduce((sum, item) => {

        const product =
            products.find(p => p.id === item.id);

        if (!product) return sum;

        return (
            sum +
            product.price * item.qty
        );

    }, 0);


    const delivery =
        subtotal > 0
            ? 40
            : 0;


    document.getElementById('subtotal').textContent =
        `₹${subtotal}`;

    document.getElementById('delivery').textContent =
        `₹${delivery}`;

    document.getElementById('total').textContent =
        `₹${subtotal + delivery}`;
}


function changeQty(id, change) {

    const item =
        cart.find(item => item.id === id);

    if (!item) return;

    item.qty += change;

    if (item.qty <= 0) {

        cart =
            cart.filter(
                item => item.id !== id
            );
    }

    saveCart();
}


function removeItem(id) {

    cart =
        cart.filter(
            item => item.id !== id
        );

    saveCart();
}


/* ==========================
   OPEN CART
========================== */

document
    .getElementById('cartBtn')
    .onclick = () => {

        panel.classList.add('open');

        panel.setAttribute(
            'aria-hidden',
            'false'
        );
    };


/* ==========================
   CLOSE CART
========================== */

document
    .getElementById('closeCart')
    .onclick = () => {

        panel.classList.remove('open');

        panel.setAttribute(
            'aria-hidden',
            'true'
        );
    };


document
    .getElementById('cartBackdrop')
    .onclick = () => {

        panel.classList.remove('open');

        panel.setAttribute(
            'aria-hidden',
            'true'
        );
    };


/* ==========================
   CHECKOUT
========================== */

document
    .getElementById('checkoutBtn')
    .onclick = () => {

        if (!cart.length) {

            alert(
                'Please add something to your cart first.'
            );

            return;
        }

        // Checkout page open
        window.location.href = 'checkout.html';
    };


/* ==========================
   INITIAL LOAD
========================== */

updateCartCount();

renderCart();