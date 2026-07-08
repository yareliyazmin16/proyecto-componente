function iniciarCronometro(posicion = 'bottom-right', tiempoAlertaMinutos = 5) {


    //creamos nuestro cronometro el diseño 
    const panel = document.createElement('div'); // Crea un nuevo elemento HTML tipo <div> en la memoria del navegador
    panel.id = 'panel-cronometro'; 
    panel.classList.add(posicion); 
    panel.style.display = 'none'; // para que no este visible 

    // creamos el encabezado 
    panel.innerHTML = ` 
        <div class="crono-encabezado">
            <span class="crono-titulo">Inactividad Detectada</span> 
        </div>
        <div id="temporizador">00:00</div>
    `;
    document.body.appendChild(panel); // para agregar el panel 


    //creamos el elemento de mensaje junto con el boton  
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


    



    // comenzamos con nuestras variables 
    let segundos = 0;
    let minutos = 0;
    let estado = null; // guarda la existencia del reloj  (ID)
    let tiempoEsperaCierre = null; // del temporizador de cierre 

    // capturamos los elementos 
    const tempori = document.getElementById('temporizador');
    const btnCerrarModal = document.getElementById('cerraraviso');




    function actualizarTiempo() {

        //la logica de un reloj normal 
        segundos++;
        if (segundos >= 60) {
            segundos = 0;
            minutos++;
        }

        //para darle un formato de 00:05 y no aparezca 05
        let segTexto = segundos < 10 ? '0' + segundos : segundos;
        let minTexto = minutos < 10 ? '0' + minutos : minutos;
        tempori.innerText = `${minTexto}:${segTexto}`;
         // si los números son menores a 10, concatena un caracter 0 a la izquierda



        //Si el usuario pasa 5 segundos seguidos sin mover el mouse APARECE EL TEMPORIZADOR 
        if (minutos === 0 && segundos >= 5) {
            panel.style.display = 'block'; // l código cambia el estilo del panel a visible 
        }



        // Cuando el cronómetro alcanza los minutos exactos  en este caso 1 minuto
        
        if (minutos === tiempoAlertaMinutos && segundos === 0) {
          
          
            // cambiar el estilo del panel y del aviso 
            panel.classList.add('alerta-limite'); //ponemos el boton en rojo
            aviso.classList.add('mostrar-modal');  // mostramos el aviso 

            //activa un temporizador asincrono del navegador de 10s si el usuario no le da click reinicia 
            tiempoEsperaCierre = setTimeout(() => { // se guarda el ID del proceso 
                window.location.reload(); 
            }, 10000); 


            // setTimeout ejecutar un bloque de código después de que haya transcurrido una cantidad de tiempo específica
        }




    }

    //ejecutar un bloque de código repetidamente, una y otra vez, cada vez que pasa un intervalo de tiempo exacto. 
    //lo ejecuta cada segundo 
    estado = setInterval(actualizarTiempo, 1000);




    //las acciones que escucha 
    window.addEventListener('mousemove', reiniciarInactividad);
    window.addEventListener('keydown', reiniciarInactividad);
    window.addEventListener('click', reiniciarInactividad);


     // SI EL USUARIO REACCIONO A TIMEPO 
    function reiniciarInactividad() {
        if (aviso.classList.contains('mostrar-modal')) return; // si ya se mostro la ventana de advertencia NO REGRESA NADA , bloquea el mouse 
        
        // si el usuario reacciono a tiempo  SE INICIA DE NUEVO LOS SEGUNDOS Y MINUTOS 
        segundos = 0;
        minutos = 0;
        tempori.innerText = "00:00"; 
        panel.style.display = 'none'; // vuelve invisible 
    }

    // volvemos al estado inciail 
    btnCerrarModal.addEventListener('click', () => {
        aviso.classList.remove('mostrar-modal');
        panel.classList.remove('alerta-limite');
        panel.style.display = 'none';
        
        if (tiempoEsperaCierre) {
            clearTimeout(tiempoEsperaCierre);
        } // NO PERMITE QUE PASE LO DE REINICIAR EL PROGRAMA 
        
        segundos = 0;
        minutos = 0;
        tempori.innerText = "00:00";
    });


    
}