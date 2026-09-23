<?php
// Configuración de cabeceras para respuesta JSON
header('Content-Type: application/json');

// Verificar que sea una petición POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(['success' => false, 'message' => 'Método no permitido']);
    exit;
}

// ==========================================
// 1. FILTRO ANTI-BOT: HONEYPOT & TIME-GATE
// ==========================================
$honeypot = isset($_POST['sitio_web']) ? trim($_POST['sitio_web']) : '';
$formLoadedAt = isset($_POST['form_loaded_at']) ? intval($_POST['form_loaded_at']) : 0;
$tiempoLlenado = ($formLoadedAt > 0) ? (time() - $formLoadedAt) : 0;

$esSpamBot = false;
$motivoSpam = '';

// Si el campo señuelo (honeypot) fue rellenado por un bot
if (!empty($honeypot)) {
    $esSpamBot = true;
    $motivoSpam = 'Campo trampa honeypot rellenado';
}
// Si el formulario se envió en menos de 3 segundos (humano tarda más) o timestamp ausente/antiguo
elseif ($formLoadedAt <= 0 || $tiempoLlenado < 3 || $tiempoLlenado > 86400) {
    $esSpamBot = true;
    $motivoSpam = ($formLoadedAt <= 0) ? 'Sin marca de tiempo (posible script directo)' : "Envío sospechoso en {$tiempoLlenado}s (< 3s)";
}

// En caso de detectar bot: Descarte silencioso (Silent Drop)
if ($esSpamBot) {
    // Registrar en log para monitoreo
    $logDir = __DIR__ . '/logs';
    if (is_dir($logDir) && is_writable($logDir)) {
        $ip = $_SERVER['REMOTE_ADDR'] ?? 'Desconocida';
        $emailSospechoso = isset($_POST['email']) ? substr(trim($_POST['email']), 0, 100) : 'N/A';
        $logEntry = date('Y-m-d H:i:s') . " | IP: $ip | Motivo: $motivoSpam | Email: $emailSospechoso\n";
        @file_put_contents($logDir . '/spam_blocked.log', $logEntry, FILE_APPEND);
    }

    // Se responde con éxito simulado para engañar al bot y evitar que pruebe otras técnicas
    echo json_encode(['success' => true, 'message' => 'Mensaje enviado correctamente']);
    exit;
}

// ==========================================
// 2. RECOGER Y VALIDAR DATOS DEL FORMULARIO
// ==========================================
$nombre = isset($_POST['nombre']) ? trim($_POST['nombre']) : '';
$empresa = isset($_POST['empresa']) ? trim($_POST['empresa']) : '';
$email = isset($_POST['email']) ? trim($_POST['email']) : '';
$telefono = isset($_POST['telefono']) ? trim($_POST['telefono']) : '';
$tipoInstitucion = isset($_POST['tipoInstitucion']) ? trim($_POST['tipoInstitucion']) : '';
$mensaje = isset($_POST['mensaje']) ? trim($_POST['mensaje']) : '';

// Servicios de interés (checkboxes)
$servicios = [];
if (isset($_POST['cartera'])) $servicios[] = 'Administración de Cartera';
if (isset($_POST['contratos'])) $servicios[] = 'Contratos Automatizados';
if (isset($_POST['contabilidad'])) $servicios[] = 'Contabilidad Financiera';
if (isset($_POST['pld'])) $servicios[] = 'PLD/EBR';
if (isset($_POST['reportes'])) $servicios[] = 'Reportes Regulatorios';

// Validar campos requeridos
$errores = [];
if (empty($nombre)) $errores[] = "El nombre es obligatorio";
if (empty($empresa)) $errores[] = "La empresa es obligatoria";
if (empty($email)) $errores[] = "El email es obligatorio";
if (empty($telefono)) $errores[] = "El teléfono es obligatorio";
if (empty($tipoInstitucion)) $errores[] = "El tipo de institución es obligatorio";

// Validar formato de email
if (!filter_var($email, FILTER_VALIDATE_EMAIL) && !empty($email)) {
    $errores[] = "Por favor, ingrese un email válido";
}

// Si no hay errores, enviar el correo
if (empty($errores)) {
    // Destinatario
    $para = 'info@financialcore.com.mx';
    
    // Sanitizar cabeceras contra Header Injection
    $nombreLimpio = str_replace(["\r", "\n"], '', $nombre);
    $emailLimpio = str_replace(["\r", "\n"], '', $email);
    $asunto = 'Nuevo mensaje de contacto de ' . $nombreLimpio;
    
    // Construir el cuerpo del mensaje en HTML (usando htmlspecialchars para seguridad)
    $cuerpoHTML = "<h2>Nuevo mensaje de contacto</h2>";
    $cuerpoHTML .= "<p><strong>Nombre:</strong> " . htmlspecialchars($nombre) . "</p>";
    $cuerpoHTML .= "<p><strong>Empresa:</strong> " . htmlspecialchars($empresa) . "</p>";
    $cuerpoHTML .= "<p><strong>Email:</strong> " . htmlspecialchars($email) . "</p>";
    $cuerpoHTML .= "<p><strong>Teléfono:</strong> " . htmlspecialchars($telefono) . "</p>";
    $cuerpoHTML .= "<p><strong>Tipo de Institución:</strong> " . htmlspecialchars($tipoInstitucion) . "</p>";
    
    if (!empty($servicios)) {
        $cuerpoHTML .= "<p><strong>Servicios de interés:</strong></p>";
        $cuerpoHTML .= "<ul>";
        foreach ($servicios as $servicio) {
            $cuerpoHTML .= "<li>" . htmlspecialchars($servicio) . "</li>";
        }
        $cuerpoHTML .= "</ul>";
    }
    
    if (!empty($mensaje)) {
        $cuerpoHTML .= "<p><strong>Mensaje:</strong></p>";
        $cuerpoHTML .= "<p>" . nl2br(htmlspecialchars($mensaje)) . "</p>";
    }
    
    // Cabeceras para el email:
    // El 'From' utiliza la dirección del dominio para cumplir políticas SPF/DKIM y evitar caer en spam.
    // El 'Reply-To' contiene el correo del cliente para responder directamente con un clic.
    $remitente = 'info@financialcore.com.mx';
    $cabeceras = "From: Davije Contacto <$remitente>\r\n";
    $cabeceras .= "Reply-To: $emailLimpio\r\n";
    $cabeceras .= "MIME-Version: 1.0\r\n";
    $cabeceras .= "Content-Type: text/html; charset=UTF-8\r\n";
    
    try {
        // Enviar el email usando la función mail() de PHP
        $enviado = mail($para, $asunto, $cuerpoHTML, $cabeceras);
        
        if ($enviado) {
            echo json_encode(['success' => true, 'message' => 'Mensaje enviado correctamente']);
        } else {
            echo json_encode(['success' => false, 'message' => 'Error al enviar el mensaje. Por favor, inténtelo de nuevo más tarde.']);
        }
        
    } catch (Exception $e) {
        echo json_encode(['success' => false, 'message' => 'Error al enviar el mensaje: ' . $e->getMessage()]);
    }
} else {
    // Errores de validación en formato JSON
    echo json_encode(['success' => false, 'message' => 'Error de validación', 'errors' => $errores]);
}

// Terminar la ejecución
exit;