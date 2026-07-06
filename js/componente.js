function iniciarCronometro(posicion = 'bottom-right', tiempoAlertaMinutos = 5) {

    const panel = document.createElement('div');
    panel.id = 'panel-cronometro';
    panel.classList.add(posicion);
    panel.style.display = 'none';

    panel.innerHTML = `
        <div class="crono-encabezado">
            <span class="crono-titulo">Inactividad Detected</span> 
        </div>
        <div id="temporizador">00:00</div>
    `;
    document.body.appendChild(panel);

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
    let tiempoEsperaCierre = null;

    const display = document.getElementById('temporizador');
    const btnCerrarModal = document.getElementById('cerraraviso');

    function actualizarTiempo() {
        segundos++;
        if (segundos >= 60) {
            segundos = 0;
            minutos++;
        }

        let segTexto = segundos < 10 ? '0' + segundos : segundos;
        let minTexto = minutos < 10 ? '0' + minutos : minutos;
        display.innerText = `${minTexto}:${segTexto}`;

        if (minutos === 0 && segundos >= 5) {
            panel.style.display = 'block';
        }

        if (minutos === tiempoAlertaMinutos && segundos === 0) {
            panel.classList.add('alerta-limite');
            aviso.classList.add('mostrar-modal'); 

            tiempoEsperaCierre = setTimeout(() => {
                window.location.reload(); 
            }, 10000); 
        }
    }

    estado = setInterval(actualizarTiempo, 1000);

    function reiniciarInactividad() {
        if (aviso.classList.contains('mostrar-modal')) return;

        segundos = 0;
        minutos = 0;
        display.innerText = "00:00";
        panel.style.display = 'none';
    }

    window.addEventListener('mousemove', reiniciarInactividad);
    window.addEventListener('keydown', reiniciarInactividad);
    window.addEventListener('click', reiniciarInactividad);

    btnCerrarModal.addEventListener('click', () => {
        aviso.classList.remove('mostrar-modal');
        panel.classList.remove('alerta-limite');
        panel.style.display = 'none';
        
        if (tiempoEsperaCierre) {
            clearTimeout(tiempoEsperaCierre);
        }
        
        segundos = 0;
        minutos = 0;
        display.innerText = "00:00";
    });
}