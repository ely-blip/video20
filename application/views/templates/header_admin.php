<!doctype html>
<html lang="es">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Galvis Cafe - Inicio</title>
    <link rel="shortcut icon" href="https://i.ibb.co/1XmpBjr/logo.webp" type="image/x-icon">
    <link rel="stylesheet" href="<?= base_url('assets/css/style.css')?> ">
    <!-- Bootstrap 5 CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">
    <!-- Bootstrap Icons CSS -->
    <link href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-icons/1.4.0/font/bootstrap-icons.css" rel="stylesheet">
    <link rel="manifest" href="<?php echo base_url('assets/manifest.json'); ?>">
  </head>
  <script>
        document.addEventListener('DOMContentLoaded', () => {
            let deferredPrompt;

            window.addEventListener('beforeinstallprompt', (e) => {
                e.preventDefault(); // Prevenir que el prompt se muestre automáticamente
                deferredPrompt = e; // Guardar el evento
                document.getElementById('install-button').style.display = 'block'; // Mostrar el botón de instalación
            });

            document.getElementById('install-button').addEventListener('click', (e) => {
                e.preventDefault();
                if (deferredPrompt) {
                    deferredPrompt.prompt(); // Mostrar el prompt de instalación
                    deferredPrompt.userChoice.then((choiceResult) => {
                        if (choiceResult.outcome === 'accepted') {
                            console.log('Usuario aceptó instalar la PWA');
                        } else {
                            console.log('Usuario rechazó instalar la PWA');
                        }
                        deferredPrompt = null; // Reiniciar el evento
                    });
                }
            });
        });
    </script>

  