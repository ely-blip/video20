<!doctype html>
<html lang="es">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Galvis Cafe - Frapes</title>
    <!-- Favi icon -->
    <link rel="shortcut icon" href="https://i.ibb.co/1XmpBjr/logo.webp" type="image/x-icon">
    <!-- Main CSS -->
    <link rel="stylesheet" href="https://app.comeya.xyz/application/assets/css/style.css">
    <!-- Bootstrap  -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
    <!-- Font Awesome -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css">





</head>

<body id="body">
<div id="loader"><l-bouncy size="85" speed="1.8" color="White"></l-bouncy></div>

  <!-- Navbar -->
  <nav class="navbar navbar-dark bg-dark fixed-top">
      <div class="container-fluid">
        
        <a href="https://app.comeya.xyz">
            <img src="https://i.ibb.co/1XmpBjr/logo.webp" alt="" style="width:65px; height:60px;">
        </a>
        <div class="container-titulo text-center text-white">
              <h2 class="color-cat-5">Frapes <i class="fas fa-blender"></i></h2>
            </div>
        

        <!-- Button to toggle menu -->
        <button class="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar">
          <span class="navbar-toggler-icon"></span>
        </button>

        <!-- Offcanvas menu -->
        <div class="offcanvas offcanvas-start bg-dark text-white" tabindex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
          <div class="offcanvas-header">
                <img src="https://i.ibb.co/1XmpBjr/logo.webp" alt="galvis cafe" style="width:65px; height:60px;">
            <h5 class="title-menu">Nuestro Menú</h5>
            <button type="button" class="btn-close btn-close-white" data-bs-dismiss="offcanvas" aria-label="Close"></button>
          </div>
          <div class="offcanvas-body">
            <ul class="navbar-nav justify-content-end flex-grow-1 pe-3">
              <li class="nav-item">
                <a class="nav-link active text-white" href="#">Inicio</a>
              </li>
              <li class="nav-item">
              <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle text-white" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Menu
          </a>
          <ul class="dropdown-menu">
            <li><a class="dropdown-item" href="https://app.comeya.xyz/application/views/Categories/Especiales.php">Especiales</a></li>
            <li><hr class="dropdown-divider"></li>
            <li><a class="dropdown-item" href="https://app.comeya.xyz/application/views/Categories/Helados.php">Helados</a></li>
            <li><a class="dropdown-item" href="https://app.comeya.xyz/application/views/Categories/Cholados.php">Cholados</a></li>
            <li><a class="dropdown-item" href="https://app.comeya.xyz/application/views/Categories/Nevados.php">Nevados</a></li>
            <li><a class="dropdown-item" href="https://app.comeya.xyz/application/views/Categories/Frapes.php">Frapes</a></li>
            <li><a class="dropdown-item" href="https://app.comeya.xyz/application/views/Categories/Malteadas.php">Malteadas</a></li>
            <li><a class="dropdown-item" href="https://app.comeya.xyz/application/views/Categories/Ensalada.php">Ensalada de Frutas</a></li>
            <li><a class="dropdown-item" href="https://app.comeya.xyz/application/views/Categories/Panaderia.php">Panaderia</a></li>
            <li><a class="dropdown-item" href="https://app.comeya.xyz/application/views/Categories/Cafe.php">Cafe</a></li>
            <li><a class="dropdown-item" href="https://app.comeya.xyz/application/views/Categories/FresasCrema.php">Fresas Con crema</a></li>
            <li><a class="dropdown-item" href="https://app.comeya.xyz/application/views/Categories/SodasMicheladas.php">Sodas Micheladas</a></li>
            <li><a class="dropdown-item" href="https://app.comeya.xyz/application/views/Categories/Cerveza.php">Cerveza</a></li>
            <li><a class="dropdown-item" href="https://app.comeya.xyz/application/views/Categories/JugosNaturales.php">Jugos Naturales</a></li>
            <li><a class="dropdown-item" href="https://app.comeya.xyz/application/views/Categories/Aromaticas.php">Aromaticas</a></li>
            
            <li><a class="dropdown-item" href="https://app.comeya.xyz/application/views/Categories/MicheladasCerveza.php">Micheladas de Cerveza</a></li>
            <li><a class="dropdown-item" href="https://app.comeya.xyz/application/views/Categories/CafeLicor.php">Cafe con licor</a></li>
            <li><a class="dropdown-item" href="https://app.comeya.xyz/application/views/Categories/Tragos.php">Tragos</a></li>
          </ul>
        </li>
              </li>
              <li class="nav-item">
                <a class="nav-link text-white" href="tel:+573233128952">Contacto</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
   <div class="container-top"></div>
    <div class="center-div">
    <button class="btn-regresar rounded-pill d-flex align-items-center " onclick="window.history.back();">
      <i class="bi bi-arrow-left me-2"></i> Regresar
    </button>
    </div>
<!-- Productos (cuadros) -->
<div class="product-container" id="productContainer">
    <!-- Los productos se cargarán aquí con JS -->
</div>


<!-- Botón flotante para mostrar el carrito -->
<div class="floating-container">
    <button class="btn btn-success floating-btn" id="showCartBtn">
        <i class="bi bi-cart3"></i>
        <span id="cartCount" class=" text-success badge bg-success-subtle badge-cart" style="display: none;"></span>
    </button>
</div>

<!-- Menú Offcanvas (Carrito) -->
<div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
    <div class="offcanvas-header">
        <h5 id="offcanvasRightLabel">Carrito de Compras&nbsp;<i class="bi bi-cart3"></i></h5>
        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="offcanvas" aria-label="Close"></button>
    </div>
    <div class="offcanvas-body">
        <div id="cartItems">
            <!-- Los productos del carrito se agregarán aquí -->
        </div>

        <!-- En el Offcanvas -->
<div class="mt-3">
    <label for="paymentMethod">Método de pago:</label>
    <select id="paymentMethod" class="form-select" onchange="toggleBankOptions()">
        <option value="Tarjeta de crédito">Tarjeta de crédito</option>
        <option value="Transferencia bancaria">Transferencia bancaria</option>
        <option value="Efectivo">Efectivo</option>
    </select>
    <div class="mb-3" id="bankAlert" style="display: none;">
        <div class="alert alert-danger" role="alert">
        <i class="bi bi-info-circle-fill"></i> &nbsp;Recuerda que debes enviar el comprobante de la transferencia bancaria.
        </div>
    </div>
    <div class="mb-3 " id="cashPaymentAmount" style="display: none;">
                <label for="paymentAmount" class="form-label text-light">Valor:</label>
                <input type="text" class="form-control bg-dark text-light border-light" id="paymentAmount" placeholder="¿Con cuánto pagas?">
            </div>
</div>

<!-- Opciones de banco (solo se muestra si se selecciona 'Transferencia bancaria') -->
<div id="bankOptions" class="mt-3" style="display: none;">
    <label for="bankSelect">Selecciona tu banco:</label>
    <select id="bankSelect" class="form-select">
        <option value="Bancolombia A la Mano">Bancolombia ala Mano</option>
        <option value="Nequi">Nequi</option>
        <option value="Daviplata">Daviplata</option>
    </select>
</div>
 <!-- Apartado para la dirección, barrio, calle, teléfono y nombre (Modo oscuro) -->
        <div class="mt-3 rem">
            <hr>
            <h5 class="text-light">Datos de Envío</h5>
            <div class="mb-3">
                <label for="name" class="form-label text-light">Nombre:</label>
                <input type="text" class="form-control bg-dark text-light border-light" id="name" placeholder="Ingresa tu nombre" required>
            </div>

            <div class="mb-3">
                <label for="address" class="form-label text-light">Dirección:</label>
                <input type="text" class="form-control bg-dark text-light border-light" id="address" placeholder="Ingresa tu dirección" required>
            </div>

            <div class="mb-3">
                <label for="neighborhood" class="form-label text-light">Barrio:</label>
                <input type="text" class="form-control bg-dark text-light border-light" id="neighborhood" placeholder="Ingresa tu barrio" required>
            </div>

            <div class="mb-3">
                <label for="phone" class="form-label text-light">Teléfono:</label>
                <input type="tel" class="form-control bg-dark text-light border-light" id="phone" placeholder="Ingresa tu número de teléfono" required>
            </div>
            <hr>
        </div>


<div class="mb-3 mrg">
    <label for="deliveryMethod" class="form-label">Método de entrega</label>
    <select class="form-select" id="deliveryMethod" onchange="updateCart()">
        <option value="Recogerlo">Recogido en tienda</option>
        <option value="Domicilio">Domicilio</option>
    </select>
    <div class="mb-3" style="margin-top: 15px;">
    <label for="comment" class="form-label text-light">Comentario adicional:</label>
    <textarea id="comment" class="form-control bg-dark text-light border-light" rows="3" placeholder="Escribe aquí tu comentario o solicitud adicional"></textarea>
</div>
</div>


<!-- Aquí se añadirá el subtotal -->
<div class="mt-3 myr">
    <h4 id="subtotalPrice">Subtotal: $0.00</h4>
    <!-- Mostrar el costo adicional solo si es "A domicilio" -->
    <p id="shippingCharge" style="display: none; color: green;">
        + $3,000 (A domicilio)
    </p>
    <hr>
    <h4 id="totalPrice">Total: $0.00</h4> <!-- El total se calculará aquí -->
</div>

        <button id="whatsappBtn" class="btn btn-success w-100" style="display: none;">
            Enviar al WhatsApp &nbsp; <i class="bi bi-whatsapp"></i>
        </button>
    </div>
</div>

        


    <!-- Footer -->
    <footer class="footer">
        <div class="footer-content">
            <div class="footer-logo" title="Galvis Cafe">
                <img src="https://i.ibb.co/1XmpBjr/logo.webp" alt="Logo GalvisCafe" class="img-fluid logo-img">
            </div>
            <div class="footer-info">
                <div class="footer-section">
                    <h4>Horario de Atención</h4>
                    <p>Lunes a Viernes de 8:00 a.m a 9:00 p.m</p>
                    <p>Sábados y Domingos de 2:00 p.m a 9:00 p.m</p>
                </div>
                <div class="footer-section">
                    <h4>Métodos de pago</h4>
                    <p>Efectivo, Nequi / Daviplata / Bancolombia</p>
                </div>
                <div class="footer-section">
                    <h4>Contáctanos</h4>
                    <p>Visítanos en La Jagua de Ibirico, Cesar:</p>
                    <p>Calle 8 N 7-45 Centro Comercial Ibirico Plaza Local 17, La Jagua de Ibirico, Cesar</p>
                    <p>Domicilios: 3233128952</p>
                </div>
                <div class="footer-section">
                    <h4>Redes Sociales</h4>
                    <p>
                    <a href="https://www.facebook.com/GALVISCAFELAJAGUADEIBIRICO" class="link-social facebook"><i class="bi bi-facebook" style="font-size: 2rem;" title="Facebook"></i>&nbsp;&nbsp;</a>
                    <a href="https://www.instagram.com/galviscafelajagua/" class="link-social instagram"> <i class="bi bi-instagram" style="font-size: 2rem;" title="Instagram"></i>&nbsp;&nbsp;</a>
                    <a href="https://wa.me/+573233128952" class="link-social whatsapp"><i class="bi bi-whatsapp" style="font-size: 2rem;" title="Whatsapp"></i>&nbsp;&nbsp;</a>
                </p>
            </div>
        </div>
    </div>
    <div class="footer-legal">
        <p>GalvisCafe - Copyright © 2024</p>
        <p><img src="https://i.ibb.co/tCZ7gLs/1-Photoroom.png" alt="comeya" style="width: 7rem;opacity: .5;">Todos los derechos reservados</p>
    </div>
</footer>


<script>
    window.addEventListener('load', function() {
        document.getElementById('loader').style.display = 'none';
    });
</script>
<script type="module" src="https://cdn.jsdelivr.net/npm/ldrs/dist/auto/bouncy.js"></script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>

<script src="https://app.comeya.xyz/application/assets/js/FuntionsFrapes.js"></script>

<script src="https://app.comeya.xyz/application/assets/js/MainFuntions.js"></script>
</body>
</html>
