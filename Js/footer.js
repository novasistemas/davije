document.addEventListener("DOMContentLoaded", function() {
  const footerHTML = `
    <footer class="footer">
      <div class="container">
            <div class="row g-4">
                <div class="col-lg-4">
                    <h5><i class="fas fa-chart-line me-2"></i>FinTech Services</h5>
                    <p class="mb-3">Servicios de Tecnología Especializada en el Sector Financiero. 
                    Automatizando los procesos y el cumplimiento de la normativa.</p>
                    <div class="social-links">
                        <a href="#" class="me-3"><i class="fab fa-linkedin fa-lg"></i></a>
                        <a href="#" class="me-3"><i class="fab fa-twitter fa-lg"></i></a>
                        <a href="#" class="me-3"><i class="fab fa-youtube fa-lg"></i></a>
                    </div>
                </div>
                <div class="col-lg-2">
                    <h5>Servicios</h5>
                    <ul class="list-unstyled">
                        <li><a href="servicios.html">Cartera de Créditos</a></li>
                        <li><a href="servicios.html">Contratos</a></li>
                        <li><a href="servicios.html">Contabilidad</a></li>
                        <li><a href="servicios.html#pld">PLD/EBR</a></li>
                        <li><a href="servicios.html#pld">Reportes</a></li>
                    </ul>
                </div>
                <div class="col-lg-2">
                    <h5>Empresa</h5>
                    <ul class="list-unstyled">
                        <li><a href="nosotros.html">Nosotros</a></li>
                        <li><a href="nosotros.html#team">Equipo</a></li>
                        <li><a href="contacto.html">Contacto</a></li>
                        <li><a href="servicios.html#testimonial">Casos de Éxito</a></li>
                    </ul>
                </div>
                <div class="col-lg-2">
                    <h5>Soporte</h5>
                    <ul class="list-unstyled">
                        <li>Lunes - Viernes: </li>
                        <li>de 9:00 a 17:00</li>
                    </ul>
                </div>
                <div class="col-lg-2">
                    <h5>Legal</h5>
                    <ul class="list-unstyled">
                        <li><a href="privacidad.html">Privacidad</a></li>
                        <li><a href="#">Licencias</a></li>
                    </ul>
                </div>
            </div>
            <hr class="mt-4 mb-3" style="border-color: var(--accent-blue);">
            <div class="row align-items-center">
                <div class="col-md-6">
                    <p class="mb-0">&copy; 2025 FinTech Solutions. Todos los derechos reservados.</p>
                </div>
                <div class="col-md-6 text-md-end">
                    <p class="mb-0">Hecho con <i class="fas fa-heart text-danger"></i> para el sector financiero mexicano</p>
                </div>
            </div>
        </div>
    </footer>
  `;
  document.getElementById("footer-container").innerHTML = footerHTML;
});