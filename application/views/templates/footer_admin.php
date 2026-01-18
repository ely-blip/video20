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









    <script type="module" src="https://cdn.jsdelivr.net/npm/ldrs/dist/auto/bouncy.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
    <script>
        document.getElementById('downloadBtn').addEventListener('click', function() {
            const link = document.createElement('a');
            link.href = 'https://app.comeya.xyz/application/assets/document/Menugalvis.pdf';
            link.download = 'Menugalvis.pdf';

            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        });
    </script>

    <script>

        window.addEventListener('load', function(){
            document.getElementById('loader').style.display = 'none';
        });


        document.getElementById("mainButton").addEventListener("click", function () {
            const menu = document.querySelector(".floating-menu");
            menu.classList.toggle("show-menu");
        });


    </script>
    <script src="https://app.comeya.xyz/application/assets/js/MainFuntions.js"></script>
  </body>
</html>
