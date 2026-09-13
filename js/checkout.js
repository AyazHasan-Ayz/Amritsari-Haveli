// ===================================
// RESTAURANT WHATSAPP NUMBER
// ===================================

// IMPORTANT:
// Yahan restaurant ka WhatsApp number lagana.
// Country code 91 ke saath.
// + sign, spaces ya dashes mat lagana.

const RESTAURANT_WHATSAPP = "9555807170";



// ===================================
// PRODUCT DATA
// ===================================

const checkoutProducts = [

    {
        id: 1,
        name: "Amritsari Paneer Tikka",
        price: 249,
        image: "assets/images/paneer-tikka.jpg"
    },

    {
        id: 2,
        name: "Butter Chicken",
        price: 299,
        image: "assets/images/butter-chicken.jpg"
    },

    {
        id: 3,
        name: "Dal Makhani",
        price: 219,
        image: "assets/images/dal-makhani.jpg"
    },

    {
        id: 4,
        name: "Amritsari Kulcha",
        price: 149,
        image: "assets/images/kulcha.jpg"
    },

    {
        id: 5,
        name: "Paneer Butter Masala",
        price: 249,
        image: "assets/images/butter-chicken.jpg"
    },

    {
        id: 6,
        name: "Chole Bhature",
        price: 179,
        image: "assets/images/cat-main.jpg"
    },

    {
        id: 7,
        name: "Tandoori Chicken",
        price: 329,
        image: "assets/images/paneer-tikka.jpg"
    },

    {
        id: 8,
        name: "Veg Biryani",
        price: 229,
        image: "assets/images/cat-rice.jpg"
    }

];



// ===================================
// CART
// ===================================

let cart = [];

try {

    cart =
        JSON.parse(
            localStorage.getItem("haveli-cart")
        ) || [];

} catch (error) {

    cart = [];

}



// ===================================
// ELEMENTS
// ===================================

const checkoutItems =
    document.getElementById(
        "checkoutItems"
    );

const subtotalEl =
    document.getElementById(
        "checkoutSubtotal"
    );

const deliveryEl =
    document.getElementById(
        "checkoutDelivery"
    );

const totalEl =
    document.getElementById(
        "checkoutTotal"
    );

const checkoutForm =
    document.getElementById(
        "checkoutForm"
    );

const successModal =
    document.getElementById(
        "successModal"
    );



// ===================================
// GET PRODUCT
// ===================================

function getProduct(id) {

    return checkoutProducts.find(
        product =>
            product.id === Number(id)
    );

}



// ===================================
// CALCULATE TOTALS
// ===================================

function calculateTotals() {

    const subtotal =
        cart.reduce(
            (sum, item) => {

                const product =
                    getProduct(item.id);

                if (!product) {
                    return sum;
                }

                return (
                    sum +
                    product.price *
                    item.qty
                );

            },
            0
        );


    const delivery =
        subtotal > 0
            ? 40
            : 0;


    const total =
        subtotal +
        delivery;


    return {
        subtotal,
        delivery,
        total
    };

}



// ===================================
// RENDER ORDER SUMMARY
// ===================================

function renderCheckout() {

    if (!cart.length) {

        checkoutItems.innerHTML = `
            <div class="empty-checkout">

                Your cart is empty.

                <br>

                <a href="index.html#menu">
                    Browse Menu →
                </a>

            </div>
        `;

        subtotalEl.textContent = "₹0";
        deliveryEl.textContent = "₹0";
        totalEl.textContent = "₹0";

        return;

    }


    checkoutItems.innerHTML =
        cart
            .map(item => {

                const product =
                    getProduct(item.id);


                if (!product) {
                    return "";
                }


                const itemTotal =
                    product.price *
                    item.qty;


                return `

                    <div class="checkout-item">

                        <img
                            src="${product.image}"
                            alt="${product.name}"
                        >

                        <div>

                            <h3>
                                ${product.name}
                            </h3>

                            <p>
                                ₹${product.price}
                                ×
                                ${item.qty}
                            </p>

                        </div>

                        <div class="item-total">

                            ₹${itemTotal}

                        </div>

                    </div>

                `;

            })
            .join("");


    const {
        subtotal,
        delivery,
        total
    } = calculateTotals();


    subtotalEl.textContent =
        `₹${subtotal}`;

    deliveryEl.textContent =
        `₹${delivery}`;

    totalEl.textContent =
        `₹${total}`;

}



// ===================================
// VALIDATE PHONE
// ===================================

function validPhone(phone) {

    return /^[6-9][0-9]{9}$/.test(
        phone
    );

}



// ===================================
// VALIDATE PINCODE
// ===================================

function validPincode(pincode) {

    return /^[1-9][0-9]{5}$/.test(
        pincode
    );

}



// ===================================
// PLACE ORDER
// ===================================

checkoutForm.addEventListener(
    "submit",
    function (event) {

        event.preventDefault();


        if (!cart.length) {

            alert(
                "Your cart is empty."
            );

            return;

        }


        const customerName =
            document
                .getElementById(
                    "customerName"
                )
                .value
                .trim();


        const phone =
            document
                .getElementById(
                    "phone"
                )
                .value
                .replace(/\D/g, "");


        const alternatePhone =
            document
                .getElementById(
                    "alternatePhone"
                )
                .value
                .replace(/\D/g, "");


        const address =
            document
                .getElementById(
                    "address"
                )
                .value
                .trim();


        const landmark =
            document
                .getElementById(
                    "landmark"
                )
                .value
                .trim();


        const city =
            document
                .getElementById(
                    "city"
                )
                .value
                .trim();


        const pincode =
            document
                .getElementById(
                    "pincode"
                )
                .value
                .replace(/\D/g, "");


        const instructions =
            document
                .getElementById(
                    "instructions"
                )
                .value
                .trim();


        const payment =
            document.querySelector(
                'input[name="payment"]:checked'
            ).value;



        // -------------------------------
        // VALIDATION
        // -------------------------------

        if (!customerName) {

            alert(
                "Please enter your name."
            );

            return;

        }


        if (!validPhone(phone)) {

            alert(
                "Please enter a valid 10-digit mobile number."
            );

            return;

        }


        if (
            alternatePhone &&
            !validPhone(alternatePhone)
        ) {

            alert(
                "Please enter a valid alternate mobile number."
            );

            return;

        }


        if (!address) {

            alert(
                "Please enter your delivery address."
            );

            return;

        }


        if (!city) {

            alert(
                "Please enter your city."
            );

            return;

        }


        if (!validPincode(pincode)) {

            alert(
                "Please enter a valid 6-digit pincode."
            );

            return;

        }



        // -------------------------------
        // ORDER TOTALS
        // -------------------------------

        const {
            subtotal,
            delivery,
            total
        } = calculateTotals();



        // -------------------------------
        // CREATE ORDER NUMBER
        // -------------------------------

        const orderId =
            "AH" +
            Date.now()
                .toString()
                .slice(-6);



        // -------------------------------
        // ORDER ITEMS TEXT
        // -------------------------------

        const orderItemsText =
            cart
                .map(
                    (item, index) => {

                        const product =
                            getProduct(
                                item.id
                            );


                        if (!product) {
                            return "";
                        }


                        return (
                            `${index + 1}. ` +
                            `${product.name}\n` +
                            `   ₹${product.price} × ${item.qty}` +
                            ` = ₹${product.price * item.qty}`
                        );

                    }
                )
                .filter(Boolean)
                .join("\n\n");



        // -------------------------------
        // WHATSAPP MESSAGE
        // -------------------------------

        const message = `🍽️ *NEW ORDER — AMRITSARI HAVELI*

*Order ID:* ${orderId}

━━━━━━━━━━━━━━

👤 *CUSTOMER DETAILS*

Name: ${customerName}
Phone: ${phone}
${alternatePhone ? `Alternate: ${alternatePhone}` : ""}

━━━━━━━━━━━━━━

📍 *DELIVERY ADDRESS*

${address}

${landmark ? `Landmark: ${landmark}` : ""}
City: ${city}
Pincode: ${pincode}

━━━━━━━━━━━━━━

🛒 *ORDER DETAILS*

${orderItemsText}

━━━━━━━━━━━━━━

Subtotal: ₹${subtotal}
Delivery: ₹${delivery}

*TOTAL: ₹${total}*

━━━━━━━━━━━━━━

💳 *Payment:* ${payment}

${instructions ? `📝 *Delivery Instructions:*\n${instructions}` : ""}

━━━━━━━━━━━━━━

Please confirm this order.`;



        // -------------------------------
        // WHATSAPP URL
        // -------------------------------

        const whatsappURL =
            `https://wa.me/${RESTAURANT_WHATSAPP}` +
            `?text=${encodeURIComponent(message)}`;



        // -------------------------------
        // SUCCESS UI
        // -------------------------------

        successModal.classList.add(
            "open"
        );



        // -------------------------------
        // OPEN WHATSAPP
        // -------------------------------

        setTimeout(() => {

            window.location.href =
                whatsappURL;

        }, 700);

    }
);



// ===================================
// ONLY NUMBERS IN PHONE / PINCODE
// ===================================

[
    "phone",
    "alternatePhone",
    "pincode"
].forEach(id => {

    const input =
        document.getElementById(id);


    input.addEventListener(
        "input",
        function () {

            this.value =
                this.value.replace(
                    /\D/g,
                    ""
                );

        }
    );

});



// ===================================
// INITIALIZE
// ===================================

renderCheckout();