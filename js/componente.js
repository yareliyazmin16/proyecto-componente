function iniciarCronometro(posicion = 'bottom-right', tiempoAlertaMinutos = 5) {

    // 1. Crear el panel del cronómetro
    const panel = document.createElement('div');
    panel.id = 'panel-cronometro';
    panel.classList.add(posicion);

    panel.innerHTML = `
        <div class="crono-encabezado">
            <span class="crono-titulo">Inactividad Detectada</span> 
        </div>
        <div id="temporizador">00:00</div>
        <button id="botonpausa">Pausar</button>
    `;
    document.body.appendChild(panel);

    // 2. Crear la ventana de aviso gris
    const aviso = document.createElement('div');
    aviso.id = 'mensajeaviso';
    aviso.innerHTML = `
        <div class="crono-cuadro-mensaje">
            <h3> Alerta por Inactividad </h3>
            <p>Has estado inactivo por más de <strong>${tiempoAlertaMinutos} minutos</strong>.</p>
            <p>Por seguridad, tu sesión se va a reiniciar si no confirmas que sigues aquí.</p>
            <button id="cerraraviso"> Seguir aquí </button>
        </div>
    `;
    document.body.appendChild(aviso);

    let segundos = 0;
    let minutos = 0;
    let estado = null;
    let estaPausado = false;
    let tiempoEsperaCierre = null;

    const display = document.getElementById('temporizador');
    const btnPausa = document.getElementById('botonpausa');
    const btnCerrarModal = document.getElementById('cerraraviso');

    // Función principal que cuenta el tiempo de inactividad
    function actualizarTiempo() {
        segundos++;
        if (segundos >= 60) {
            segundos = 0;
            minutos++;
        }

        let segTexto = segundos < 10 ? '0' + segundos : segundos;
        let minTexto = minutos < 10 ? '0' + minutos : minutos;
        display.innerText = `${minTexto}:${segTexto}`;

        // Si llega al límite de inactividad, se activa la alerta y el modal gris
        if (minutos === tiempoAlertaMinutos && segundos === 0) {
            panel.classList.add('alerta-limite');
            aviso.classList.add('mostrar-modal'); 

            // Si en 10 segundos más no da clic en "Seguir aquí", la página se reinicia
            tiempoEsperaCierre = setTimeout(() => {
                window.location.reload(); 
            }, 10000); 
        }
    }

    // Arranca el contador por primera vez
    estado = setInterval(actualizarTiempo, 1000);

    // ==========================================================================
    // ¡AQUÍ ESTÁ LA MAGIA DE LA VIDA REAL! (ESCUCHADORES DE EVENTOS)
    // ==========================================================================
    
    // Esta función pone el reloj otra vez en 00:00 porque el usuario hizo algo
    function reiniciarInactividad() {
        // Si el reloj está pausado o la ventana gris ya saltó, no reiniciamos nada
        if (estaPausado || aviso.classList.contains('mostrar-modal')) return;

        segundos = 0;
        minutos = 0;
        display.innerText = "00:00";
    }

    // JavaScript se queda "escuchando" si el usuario mueve el mouse o teclea
    window.addEventListener('mousemove', reiniciarInactividad);
    window.addEventListener('keydown', reiniciarInactividad);
    window.addEventListener('click', reiniciarInactividad);

    // ==========================================================================

    // Botón Pausar/Reanudar
    btnPausa.addEventListener('click', () => {
        if (!estaPausado) {
            clearInterval(estado);
            btnPausa.innerText = 'Reanudar';
            btnPausa.style.backgroundColor = '#2ecc71';
            panel.classList.add('pausado');
            estaPausado = true;
        } else {
            estado = setInterval(actualizarTiempo, 1000);
            btnPausa.innerText = 'Pausar';
            btnPausa.style.backgroundColor = '#e74c3c';
            panel.classList.remove('pausado');
            estaPausado = false;
        }
    });

    // Botón "Seguir aquí" (Cierra el modal y limpia el contador de reinicio)
    btnCerrarModal.addEventListener('click', () => {
        aviso.classList.remove('mostrar-modal');
        panel.classList.remove('alerta-limite');
        
        if (tiempoEsperaCierre) {
            clearTimeout(tiempoEsperaCierre);
        }
        
        // Regresamos el reloj a cero para que empiece a medir la inactividad otra vez
        reiniciarInactividad(); 
    });
}