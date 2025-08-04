// filepath: e:\Archivo Disco C\PaginaWeb\Davije\navbar.js
document.addEventListener("DOMContentLoaded", function() {
  const navbarHTML = `
    <nav class="navbar navbar-expand-lg fixed-top">
      <div class="container">
        <a class="navbar-brand" href="index.html">FinTech Solutions</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav ms-auto">
            <li class="nav-item"><a class="nav-link" href="index.html">Inicio</a></li>
            <li class="nav-item"><a class="nav-link" href="servicios.html">Servicios</a></li>
            <li class="nav-item"><a class="nav-link" href="nosotros.html">Nosotros</a></li>
            <li class="nav-item"><a class="nav-link" href="contacto.html">Contacto</a></li>
          </ul>
        </div>
      </div>
    </nav>
  `;
  document.getElementById("navbar-container").innerHTML = navbarHTML;
});