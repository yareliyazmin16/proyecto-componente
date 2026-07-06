function iniciarCronometro(posicion = 'bottom-right', tiempoAlertaMinutos = 5) {

    const panel = document.createElement('div');
    panel.id = 'panel-cronometro'; 
    panel.classList.add(posicion);

    panel.innerHTML = `
        <div class="crono-encabezado">
            <span class="crono-titulo">Tiempo en Sesión</span> 
        </div>
        <div id="temporizador">00:00</div>
        <button id="botonpausa">Pausar</button>
    `;
    
    document.body.appendChild(panel);

    const aviso = document.createElement('div');
    aviso.id = 'mensajeaviso';
    aviso.innerHTML = `
        <div class="crono-cuadro-mensaje">
            <h3> Aviso de Tiempo </h3>
            <p>Has permanecido en la página por más de <strong>${tiempoAlertaMinutos} minutos</strong>.</p>
            <p>Te recomendamos guardar tus avances o cerrar la página </p>
            <button id="cerraraviso"> Entendido </button>
        </div>
    `;
    document.body.appendChild(aviso);

    let segundos = 0;
    let minutos = 0;
    let estado = null;
    let estaPausado = false;

    const display = document.getElementById('temporizador');
    const btnPausa = document.getElementById('botonpausa');
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

        if (minutos === tiempoAlertaMinutos && segundos === 0) {
            panel.classList.add('alerta-limite');
            aviso.classList.add('mostrar-modal'); 
        }
    }

    estado = setInterval(actualizarTiempo, 1000);

    btnPausa.addEventListener('click', () => {
        if (!estaPausado) {
            clearInterval(estado);
            btnPausa.innerText = 'Reanudar';
            panel.classList.add('pausado');
            estaPausado = true;
        } else {
            estado = setInterval(actualizarTiempo, 1000);
            btnPausa.innerText = 'Pausar';
            panel.classList.remove('pausado');
            estaPausado = false;
        }
    });

    btnCerrarModal.addEventListener('click', () => {
        aviso.classList.remove('mostrar-modal');
    });
}