document.addEventListener('DOMContentLoaded', function() {
    // Inicializa EmailJS con tu User ID
    emailjs.init("TU-USER-ID-PUBLICO");

    const contactForm = document.getElementById('contactForm');
    
    contactForm.addEventListener('submit', function(event) {
        event.preventDefault();

        // Muestra indicador de carga
        const submitButton = this.querySelector('button[type="submit"]');
        const originalText = submitButton.innerHTML;
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
        submitButton.disabled = true;

        // Envía el correo usando EmailJS
        emailjs.sendForm('service_gmail', 'template_contact', this)
            .then(function() {
                alert('¡Mensaje enviado correctamente!');
                contactForm.reset();
            })
            .catch(function(error) {
                alert('Error al enviar el mensaje: ' + error);
            })
            .finally(function() {
                submitButton.innerHTML = originalText;
                submitButton.disabled = false;
            });
    });
});