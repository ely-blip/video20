
// Inicio de cargue de productos

// Productos disponibles (4 productos de prueba)
const products = [
    { id: 56, name: "Ensalada de Frutas",info:"Ensalada de Frutas",descripcion:"Acorde, el precio de la ensalada de frutas es de $10.000 en adelante." , price: 10000, img: "https://i.ibb.co/Msj6y2M/Especiales.png" },
];


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
                              <p class="card-text">Precio: <b style="color:green;">Acorde, el precio de la ensalada de frutas es de $10.000 en adelante.</p>
                              
                              <!-- Rango de precios -->
                              <label for="customRange" class="form-label mt-2">Selecciona el precio $</label>
                              <input type="range" class="form-range" min="10000" max="100000" step="10000" id="customRange${product.id}" value="${product.price}">
                              <p>Precio: <span id="rangeValue${product.id}">$${product.price.toLocaleString('es-CO')}</span></p>

                              <!-- Botón de compra -->
                              <button class="btn btn-success" onclick="addToCart(${product.id})">Agregar</button>
                          </div>
                      </div>
                  </div>
              </div>
          </section>
        `;

        productContainer.appendChild(div);

        // Actualizar el precio dinámicamente cuando se cambia el rango
        const rangeInput = document.getElementById(`customRange${product.id}`);
        const rangeValue = document.getElementById(`rangeValue${product.id}`);
        
        rangeInput.addEventListener('input', function() {
            const selectedPrice = rangeInput.value;
            rangeValue.textContent = `$${selectedPrice.toLocaleString('es-CO')}`;
            product.price = parseInt(selectedPrice);
        });
    });
}

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

function displayCart() {
    const cartCount = document.getElementById("cartCount");
    const cartItems = document.getElementById("cartItems");
    const whatsappBtn = document.getElementById("whatsappBtn");
    const subtotalPriceElement = document.getElementById("subtotalPrice"); // Elemento para el subtotal
    const totalPriceElement = document.getElementById("totalPrice"); // Elemento para el total
    const shippingChargeElement = document.getElementById("shippingCharge"); // Elemento para el costo de envío

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
        shippingChargeElement.textContent = ` <p style ="">Envio:</p> +$3,000`;
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

