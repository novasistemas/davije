document.addEventListener("DOMContentLoaded", function() {
  const footerHTML = `
    <footer class="footer">
      <div class="container">
            <div class="row g-4">
                <div class="col-lg-4">
                    <h5><i class="fas fa-chart-line me-2"></i>FinTech Solutions</h5>
                    <p class="mb-3">Soluciones tecnológicas especializadas para el sector financiero mexicano. 
                    Transformamos la manera en que las instituciones financieras operan y cumplen con la regulación.</p>
                    <div class="social-links">
                        <a href="#" class="me-3"><i class="fab fa-linkedin fa-lg"></i></a>
                        <a href="#" class="me-3"><i class="fab fa-twitter fa-lg"></i></a>
                        <a href="#" class="me-3"><i class="fab fa-youtube fa-lg"></i></a>
                    </div>
                </div>
                <div class="col-lg-2">
                    <h5>Servicios</h5>
                    <ul class="list-unstyled">
                        <li><a href="#servicios">Cartera de Créditos</a></li>
                        <li><a href="#servicios">Contratos</a></li>
                        <li><a href="#servicios">Contabilidad</a></li>
                        <li><a href="#servicios">PLD/EBR</a></li>
                        <li><a href="#servicios">Reportes</a></li>
                    </ul>
                </div>
                <div class="col-lg-2">
                    <h5>Empresa</h5>
                    <ul class="list-unstyled">
                        <li><a href="#nosotros">Nosotros</a></li>
                        <li><a href="#nosotros">Equipo</a></li>
                        <li><a href="#contacto">Contacto</a></li>
                        <li><a href="#">Blog</a></li>
                        <li><a href="#">Casos de Éxito</a></li>
                    </ul>
                </div>
                <div class="col-lg-2">
                    <h5>Soporte</h5>
                    <ul class="list-unstyled">
                        <li><a href="#">Centro de Ayuda</a></li>
                        <li><a href="#">Documentación</a></li>
                        <li><a href="#">API</a></li>
                        <li><a href="#">Estado del Servicio</a></li>
                        <li><a href="#">Actualizaciones</a></li>
                    </ul>
                </div>
                <div class="col-lg-2">
                    <h5>Legal</h5>
                    <ul class="list-unstyled">
                        <li><a href="#">Términos de Uso</a></li>
                        <li><a href="#">Privacidad</a></li>
                        <li><a href="#">Cookies</a></li>
                        <li><a href="#">Licencias</a></li>
                        <li><a href="#">Compliance</a></li>
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