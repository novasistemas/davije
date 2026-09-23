document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    const formLoadedInput = document.getElementById('form_loaded_at');

    // Inicializar timestamp al cargar la página
    if (formLoadedInput) {
        formLoadedInput.value = Math.floor(Date.now() / 1000);
    }
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            // Mostrar indicador de carga
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Enviando...';
            submitBtn.disabled = true;
            
            // Crear objeto FormData para enviar los datos del formulario
            const formData = new FormData(this);
            
            // Enviar el formulario usando Fetch API
            fetch('procesar-formulario.php', {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    // Mostrar mensaje de éxito
                    alert(data.message || 'Mensaje enviado correctamente. Nos pondremos en contacto pronto.');
                    
                    // Restablecer el formulario y renovar timestamp
                    contactForm.reset();
                    if (formLoadedInput) {
                        formLoadedInput.value = Math.floor(Date.now() / 1000);
                    }
                } else {
                    // Mostrar mensaje de error
                    if (data.errors && Array.isArray(data.errors)) {
                        alert(data.errors.join('\n'));
                    } else {
                        alert(data.message || 'Error al enviar el mensaje. Por favor, inténtelo de nuevo más tarde.');
                    }
                }
                
                // Restaurar el botón
                submitBtn.innerHTML = originalBtnText;
                submitBtn.disabled = false;
            })
            .catch(error => {
                console.error('Error:', error);
                
                // Mostrar alerta de error
                alert('Error al enviar el mensaje. Por favor, inténtelo de nuevo más tarde.');
                
                // Restaurar el botón
                submitBtn.innerHTML = originalBtnText;
                submitBtn.disabled = false;
            });
        });
    }
});