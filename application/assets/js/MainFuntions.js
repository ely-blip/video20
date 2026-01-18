
// Cargar el carrito desde localStorage (si existe)
let cart = JSON.parse(localStorage.getItem("cart")) || [];

function displayProducts() {
    const productContainer = document.getElementById("productContainer");
    // Vaciar el contenedor de productos antes de llenarlo
    productContainer.innerHTML = '';

    // Recorremos el array de productos y creamos las tarjetas dinámicamente
    products.forEach(product => {
        const div = document.createElement("div");
        div.classList.add("col-md-6", "col-lg-4", "mb-4");  // Usamos las clases de Bootstrap para las columnas

        div.innerHTML = `
        
          <section class="row justify-content-center" style="margin-right:15px";>
    <div class="col-md-6 col-lg-4 mb-4">
        <div class="card">
            <div class="card-body d-flex">
                <!-- Imagen del producto -->
                <img src="${product.img}" class="img-fluid me-3" alt="${product.info}" style=" margin-left: 10px;width: 150px; height: 100px; object-fit: cover;">
                
                <!-- Contenido del producto (nombre, precio, botón) -->
                <div class="d-flex flex-column justify-content-between" style="flex-grow: 1;">
                    <h5 class="card-title">${product.name}</h5>
                    <p class="card-text">Precio: <b style="color:green;">$${product.price.toLocaleString('es-CO')}</b></p>
                    <button class="btn btn-success top-m" onclick="addToCart(${product.id})">Agregar</button>
                </div>
            </div>
        </div>
    </div>
</section>
        `;

        productContainer.appendChild(div);
    });
}

// Fin de cargue de productos


function displayCart() {
    const cartCount = document.getElementById("cartCount");
    const cartItems = document.getElementById("cartItems");
    const whatsappBtn = document.getElementById("whatsappBtn");
    const subtotalPriceElement = document.getElementById("subtotalPrice"); // Elemento para el subtotal
    const totalPriceElement = document.getElementById("totalPrice"); // Elemento para el total
    const shippingChargeElement = document.getElementById("shippingCharge"); // Elemento para el costo de envío
    document.getElementById("deliveryMethod").addEventListener("change", function() {
        displayCart(); // Recalcular el carrito cada vez que se cambia el método de entrega
    });
    

    cartItems.innerHTML = ""; // Limpiar carrito
    let subtotal = 0; // Inicializar subtotal
    let shippingCost = 0; // Inicializar costo de envío

    // Verificar si el carrito está vacío
    if (cart.length === 0) {
        cartItems.innerHTML = "<p style='color: #cccccc61;'>Tu carrito está vacío.</p>";
        whatsappBtn.style.display = "none";  // No mostrar botón de WhatsApp si el carrito está vacío
    } else {
        cart.forEach(item => {
            const div = document.createElement("div");
            div.classList.add("product");
            div.innerHTML = `
                <img src="${item.img}" alt="${item.info}" style="width: 30px; height: 30px;">
                <span>${item.info}</span>
                <span><b style="color:green;">$${item.price.toLocaleString('es-CO')}</b> x ${item.cantidad}</span>
                <button class="btn btn-danger btn-sm marn-ri" onclick="removeFromCart(${item.id})"><i class="bi bi-trash3-fill"></i></button>
            `;
            cartItems.appendChild(div);

            // Calcular el subtotal de la compra (sin incluir envío)
            subtotal += item.price * item.cantidad;
            
        });

        whatsappBtn.style.display = "block";  // Mostrar botón de WhatsApp cuando hay productos en el carrito
    }
    
    // Mostrar el subtotal actualizado en el carrito
    subtotalPriceElement.textContent = `Productos: $${subtotal.toLocaleString('es-CO')}`;

    // Verificar si se seleccionó "A domicilio" y mostrar el costo adicional
    const deliveryMethod = document.getElementById("deliveryMethod").value;
    if (deliveryMethod === "Domicilio" && cart.length > 0) {  // Solo agregar costo de envío si hay productos
        shippingCost = 3000; // Se asigna el costo de envío
        shippingChargeElement.style.display = "block"; // Mostrar costo de envío
    } else {
        shippingCost = 0; // Si no es "A domicilio" o el carrito está vacío, no hay costo de envío
        shippingChargeElement.style.display = "none"; // Ocultar costo de envío
    }

    // Mostrar el costo de envío
    if (shippingCost > 0) {
        shippingChargeElement.textContent = ` Envio: +$3,000`;
    }

    // Calcular el total (Subtotal + Costo de envío si aplica)
    const total = subtotal + shippingCost;
    totalPriceElement.textContent = `Total: $${total.toLocaleString('es-CO')}`;

    // Actualizar el contador del carrito
    cartCount.textContent = cart.length;
    cartCount.style.display = cart.length > 0 ? "inline" : "none";  // Solo mostrar si el carrito tiene productos

    // Guardar el carrito en localStorage
    localStorage.setItem("cart", JSON.stringify(cart));
}


// Agregar producto al carrito
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        // Verificar si el producto ya está en el carrito
        const productInCart = cart.find(p => p.id === productId);
        if (productInCart) {
            // Si el producto ya está en el carrito, incrementamos su cantidad
            productInCart.cantidad += 1;
        } else {
            // Si no está en el carrito, lo agregamos con cantidad 1
            cart.push({ ...product, cantidad: 1 });
        }
        displayCart();
    }
}

// Eliminar producto del carrito (si la cantidad es mayor a 1, solo reducirla)
function removeFromCart(productId) {
    const productInCart = cart.find(p => p.id === productId);
    if (productInCart.cantidad > 1) {
        // Si la cantidad es mayor a 1, solo reducir la cantidad
        productInCart.cantidad -= 1;
    } else {
        // Si la cantidad es 1, eliminar el producto del carrito
        cart = cart.filter(p => p.id !== productId);
    }
    displayCart();
}

// Obtener saludo dependiendo de la hora del día
function getGreeting() {
    const hour = new Date().getHours();

    if (hour < 12) {
        return "¡Hola! Buenos días.";  // De 00:00 a 11:59
    } else if (hour < 18) {
        return " ¡Hola! Buenas tardes.";  // De 12:00 a 17:59
    } else {
        return "¡Hola! Buenas noches.";  // De 18:00 en adelante
    }
}


// Función para manejar el cambio en el método de pago
function toggleBankOptions() {
    const paymentMethod = document.getElementById("paymentMethod").value;
    const bankOptions = document.getElementById("bankOptions");
    const cashPaymentAmount = document.getElementById("cashPaymentAmount");
    const bankAlert = document.getElementById("bankAlert"); // Obtenemos el div de la alerta

    // Mostrar/ocultar opciones de banco dependiendo del método de pago
    if (paymentMethod === "Transferencia bancaria") {
        bankOptions.style.display = "block"; // Mostrar opciones de banco
        cashPaymentAmount.style.display = "none"; // Ocultar el campo de efectivo
        bankAlert.style.display = "block"; // Mostrar la alerta de transferencia
    } else if (paymentMethod === "Efectivo") {
        cashPaymentAmount.style.display = "block"; // Mostrar el campo para "¿Con cuánto pagas?"
        bankOptions.style.display = "none"; // Ocultar las opciones de banco
        bankAlert.style.display = "none"; // Ocultar la alerta
    } else {
        bankOptions.style.display = "none"; // Ocultar opciones de banco
        cashPaymentAmount.style.display = "none"; // Ocultar el campo de efectivo
        bankAlert.style.display = "none"; // Ocultar la alerta
    }
}

function sendToWhatsApp() {
    // Obtener el saludo
    const greeting = getGreeting();

    // Obtener el método de pago y el método de entrega desde el Offcanvas
    const paymentMethod = document.getElementById("paymentMethod").value;
    const deliveryMethod = document.getElementById("deliveryMethod").value;

    // Verificar que todos los campos necesarios están llenos
    const name = document.getElementById("name").value;
    const address = document.getElementById("address").value;
    const neighborhood = document.getElementById("neighborhood").value;
    const phone = document.getElementById("phone").value;

    // Validar que los campos de datos de envío no estén vacíos
    if (!name || !address || !neighborhood || !phone) {
        alert("Por favor, completa todos los campos de datos de envío.");
        return; // Detener la ejecución si falta algún dato
    }

    // Si el método de pago es Transferencia bancaria, obtener el banco seleccionado
    let bank = "";
    if (paymentMethod === "Transferencia bancaria") {
        bank = document.getElementById("bankSelect").value;
        if (!bank) {
            alert("Por favor, selecciona tu banco para la transferencia.");
            return;
        }
    }

    // Obtener el valor con el que se pagará (si se selecciona "Efectivo")
    const paymentAmount = document.getElementById("paymentAmount").value;
    if (paymentMethod === "Efectivo" && !paymentAmount) {
        alert("Por favor, ingresa el valor con el que vas a pagar.");
        return;
    }

    // Obtener el comentario adicional
    const additionalComment = document.getElementById("comment").value;

    // Recalcular el subtotal y el costo de envío desde el carrito
    let subtotal = 0;
    let shippingCost = 0;
    cart.forEach(item => {
        subtotal += item.price * item.cantidad;
    });

    // Verificar si se seleccionó "A domicilio" y agregar el costo de envío
    if (deliveryMethod === "Domicilio" && cart.length > 0) {
        shippingCost = 3000;  // Costo de envío
    }

    // Calcular el total (Subtotal + Costo de envío)
    const total = subtotal + shippingCost;

    // Crear el mensaje
    let message = `${greeting}\nhe visitado su página web y estoy interesado/a en realizar un pedido. \n\n`;
    message += `*Detalles de la Orden:*\n\n`;

    cart.forEach(item => {
        message += `${item.cantidad} - ${item.info} \n`;
    });

    // Añadir información del cliente (datos de envío)
    message += `\n*Datos de Envío:*\n\n`;
    message += `Nombre: *${name}*\n`;
    message += `Dirección: *${address}*\n`;
    message += `Barrio: *${neighborhood}*\n`;
    message += `Teléfono: *${phone}*\n`;

    // Agregar el método de pago y de entrega al mensaje
    message += `\nVoy a Realizar mi pago con: *${paymentMethod}*`;

    // Si es transferencia bancaria, agregar el banco seleccionado
    if (paymentMethod === "Transferencia bancaria") {
        message += `\na través de *${bank}*`;
    }

    // Si es "Efectivo", agregar el valor ingresado
    if (paymentMethod === "Efectivo" && paymentAmount) {
        message += `\nVoy a pagar con: *$${paymentAmount}*`;
    }

    
    // Agregar el método de entrega
    if (deliveryMethod === "Domicilio") {
        message += `\nPor favor, envíenmelo a *${deliveryMethod}*\n`;
    } else {
        message += `\nPaso a *${deliveryMethod}*\n`;
    }
    
    // Agregar el total de la compra
    message += `\nTotal de la compra: *$${total.toLocaleString('es-CO')}*`;

    // Agregar comentario adicional
    if (additionalComment) {
        message += `\n*Comentario adicional:*\n${additionalComment}\n`;
    }

    // Crear el enlace para WhatsApp
    const whatsappUrl = `https://wa.me/+573233128952?text=${encodeURIComponent(message)}`;
    
    // test
    // const whatsappUrl = `https://wa.me/+573216816858?text=${encodeURIComponent(message)}`;

    // Abrir la conversación de WhatsApp
    window.open(whatsappUrl, '_blank');

    // Vaciar el carrito después de enviar el mensaje
    cart = []; // Vaciar el carrito
    localStorage.setItem("cart", JSON.stringify(cart)); // Actualizar el localStorage

    // Limpiar los campos de entrada (nombre, dirección, barrio, teléfono, monto en efectivo, etc.)
    document.getElementById("name").value = "";
    document.getElementById("address").value = "";
    document.getElementById("neighborhood").value = "";
    document.getElementById("phone").value = "";
    document.getElementById("paymentAmount").value = ""; // Si el método de pago es "Efectivo"
    document.getElementById("comment").value = ""; // Limpiar el campo de comentario adicional

    // Limpiar el método de pago y de entrega
    document.getElementById("paymentMethod").value = "";  // Opcional: resetear a un valor por defecto
    document.getElementById("deliveryMethod").value = ""; // Opcional: resetear a un valor por defecto

    // Si es necesario, también puedes ocultar la sección de pago en efectivo o de banco
    toggleBankOptions();

    // Llamar a displayCart() para actualizar la vista del carrito en la interfaz
    displayCart();
}


// Configuración de eventos
document.getElementById("showCartBtn").addEventListener("click", function() {
    const offcanvas = new bootstrap.Offcanvas(document.getElementById("offcanvasRight"));
    offcanvas.show();
});

document.getElementById("whatsappBtn").addEventListener("click", sendToWhatsApp);

// Mostrar productos disponibles al cargar la página
window.onload = function() {
    displayProducts();
    displayCart();  // Cargar el carrito desde localStorage al cargar la página
};


