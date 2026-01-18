<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Comeya - Iniciar Sesión</title>
    <link rel="shortcut icon" href="https://i.ibb.co/sQVD8vP/faviicon.png" type="image/x-icon">
    <link rel="stylesheet" href="https://app.comeya.xyz/application/assets/css/style.css">
    <!-- Bootstrap -->
    <link href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-icons/1.4.0/font/bootstrap-icons.css" rel="stylesheet">
    <link rel="stylesheet" href="https://app.comeya.xyz/application/assets/css/style.css">


</head>
<style>
       html, body {
    margin: 0;
    padding: 0;
    height: 100%;
    overflow: hidden;
}

</style>
<body>
<div id="loader">
    <l-bouncy size="85" speed="1.8" color="White"></l-bouncy>
</div>
<div class="login-container">
    <div class="login-box">
        <a href="https://app.comeya.xyz/application/views/Panel/panel.php" class="link-login">Panel Control</a>
        <img src="https://i.ibb.co/tCZ7gLs/1-Photoroom.png" alt="Logo Comeya">
        <div class="welcome-message"></div>
        <h2 class="title-login">Iniciar Sesión</h2>
        <form>
            <div class="input-group flex-nowrap">
                <span class="input-group-text" id="addon-wrapping"><i class="bi bi-person-circle"></i></span>
                <input type="text" class="form-control" id="txtUser" placeholder="Ingresa Usuario" aria-label="Usuario" aria-describedby="addon-wrapping">
            </div>
            <div class="input-group flex-nowrap">
                <span class="input-group-text" id="addon-wrapping"><i class="bi bi-unlock-fill"></i></span>
                <input type="password" class="form-control" id="txtPassword" placeholder="Ingresa Contraseña" aria-label="Contraseña" aria-describedby="addon-wrapping">
            </div>
            <button class="btn-submit" id="loginUser">Iniciar Sesión</button><br><br>
            <a href="https://app.comeya.xyz" class="link-login"><i class="bi bi-chevron-compact-left"></i>Volver al Inicio</a>
        </form>
    </div>
</div>
<script>
    // Reload
    window.addEventListener('load', function(){
        document.getElementById('loader').style.display = 'none';
    });
</script>
<script type="module" src="https://cdn.jsdelivr.net/npm/ldrs/dist/auto/bouncy.js"></script>
<script src="https://app.comeya.xyz/application/assets/js/funtionsLogin.js"></script>
<script src="https://code.jquery.com/jquery-3.5.1.min.js"></script>
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
</body>
</html> 
