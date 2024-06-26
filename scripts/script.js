// CONSTANTES
const colorCampoCorrecto = "#74ef7a40";
const colorCampoIncorrecto = "#ff002030";
const regexNumerico = /^\d+$/;
const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// EQUIPO MEDICO

function togglePerfil(element) {
    element.classList.toggle("active");
}

// FORMULARIO CONTACTO
function validarFormularioContacto(){
    const nombre = document.getElementById("nombre").value;
    const apellido = document.getElementById("apellido").value;
    const email = document.getElementById("email").value;
    const consultas = document.getElementById("consultas").value;

    const nombreValido = validarNombre(nombre);
    const apellidoValido = validarApellido(apellido);
    const emailValido = validarEmail(email);
    const consultasValido = validarConsultas(consultas);

    const esValido = nombreValido && apellidoValido && emailValido && consultasValido;

    return esValido;
}

/**
 * Maneja el evento de envío del formulario de contacto.
 * Si encontramos el formulario de contacto, entonces inicializamos el listener.
 */
const formularioContacto = document.getElementById('formularioContacto');
if(formularioContacto){
    formularioContacto.addEventListener('submit', function(event) {
        event.preventDefault();
        
        validarFormularioContacto();


    });
}


// FORMULARIO TURNOS

function validarFormularioTurno() {
    const nombre = document.getElementById("nombre").value;
    const apellido = document.getElementById("apellido").value;
    const email = document.getElementById("email").value;
    const telefono = document.getElementById("telefono").value;
    const fecha = document.getElementById("fecha").value;
    const hora = document.getElementById("hora").value;
    const obraSocial = document.getElementById("obras_sociales").value;

    const nombreValido = validarNombre(nombre);
    const apellidoValido = validarApellido(apellido);
    const emailValido = validarEmail(email);
    const telefonoValido = validarTelefono(telefono);
    const fechaValida = validarFecha(fecha);
    const horaValida = validarHora(hora);
    const obraSocialValida = validarObrasSociales(obraSocial);

    const esValido = nombreValido && apellidoValido && emailValido && telefonoValido && fechaValida && horaValida && obraSocialValida;

    return esValido;
}

/**
 * Actualiza el estilo del campo de entrada basado en su validez.
 * @param {HTMLElement} input - El campo de entrada a actualizar.
 * @param {boolean} esValido - Indica si el campo es válido o no.
 */
function actualizarEstiloCampo(input, esValido) {
    if (esValido) {
        input.style.backgroundColor = colorCampoCorrecto;
        input.style.border = "none";
    } else {
        input.style.backgroundColor = colorCampoIncorrecto;
    }
}
function validarConsultas(consultas) {
    const input = document.getElementById("consultas");
    const esValido = consultas && isNaN(consultas);
    actualizarEstiloCampo(input, esValido);
    return esValido;
}

function validarNombre(nombre) {
    const input = document.getElementById("nombre");
    const esValido = nombre && isNaN(nombre);
    actualizarEstiloCampo(input, esValido);
    return esValido;
}

function validarApellido(apellido) {
    const input = document.getElementById("apellido");
    const esValido = apellido && isNaN(apellido);
    actualizarEstiloCampo(input, esValido);
    return esValido;
}

function validarEmail(email) {
    const input = document.getElementById("email");
    const esValido = regexEmail.test(email);
    actualizarEstiloCampo(input, esValido);
    return esValido;
}

function validarTelefono(telefono) {
    const input = document.getElementById("telefono");
    const esValido = telefono && regexNumerico.test(telefono);
    actualizarEstiloCampo(input, esValido);
    return esValido;
}

function validarFecha(fecha) {
    const input = document.getElementById("fecha");
    const [anio, mes, dia] = fecha.split('-').map(Number);
    const fechaReal = new Date(anio, mes - 1, dia);
    const esValido = fechaReal.getFullYear() === anio && fechaReal.getMonth() === mes - 1 && fechaReal.getDate() === dia;
    actualizarEstiloCampo(input, esValido);
    return esValido;
}

function validarHora(hora) {
    const input = document.getElementById("hora");
    const esValido = hora !== "";
    actualizarEstiloCampo(input, esValido);
    return esValido;
}

function validarObrasSociales(obraSocial) {
    const input = document.getElementById("obras_sociales");
    const esValido = obraSocial !== "";
    actualizarEstiloCampo(input, esValido);
    return esValido;
}

/**
 * Maneja el evento de envío del formulario de turnos.
 * Si encontramos el formuulario turnos, entonces inicializamos el listener.
 */
const formularioTurnos = document.getElementById('formularioTurnos');
if(formularioTurnos){
    formularioTurnos.addEventListener('submit', function(event) {
        event.preventDefault();
        
        validarFormularioTurno();
            
    });



    // MOSTRAR CALENDARIO
    //focus: click en un input
    const fechaInput = document.getElementById('fecha');
    fechaInput.addEventListener('focus', function(){
        const calendarModal = document.getElementById('calendarModal');
        calendarModal.style.display = 'initial';
        const htmlBody = document.getElementById('body');
        htmlBody.style.overflow = 'hidden';
    })

    // CALENDARIO

    /**
     * Maneja la funcionalidad de un calendario interactivo y un formulario de turnos.
     */
    const calendario = document.getElementById('calendar');
    const horaSelect = document.getElementById('hora');
    const botonMesAnterior = document.getElementById('mesAnterior');
    const botonMesPosterior = document.getElementById('mesPosterior');
    const calendarModal = document.getElementById('calendarModal');
    const htmlBody = document.getElementById('body');


    let fechaActual = new Date();
    const hoy = new Date();
    const fechaMaxima = new Date(hoy.getFullYear(), hoy.getMonth() + 2, hoy.getDate());

    function crearCalendario(year, month) {
        const diasEnMes = new Date(year, month + 1, 0).getDate();
        const primerDia = new Date(year, month, 1).getDay();
        
        calendario.innerHTML = '';
        
        for (let i = 0; i < primerDia; i++) {
            const celdaVacia = document.createElement('div');
            calendario.appendChild(celdaVacia);
        }

        for (let i = 1; i <= diasEnMes; i++) {
            const diaCelda = document.createElement('div');
            diaCelda.classList.add('day');
            diaCelda.textContent = i;

            const fecha = new Date(year, month, i);
            if (fecha < hoy || fecha > fechaMaxima) {
                diaCelda.classList.add('disabled');
                diaCelda.style.pointerEvents = 'none';
                diaCelda.style.color = '#ccc';
            } else {
                diaCelda.addEventListener('click', function() {
                    document.querySelectorAll('.day').forEach(dia => dia.classList.remove('selected'));
                    diaCelda.classList.add('selected');
                    fechaInput.value = `${year}-${month + 1}-${i}`;
                    llenarHoraSelect();
                    calendarModal.style.display = 'none';
                    htmlBody.style.overflow = 'auto';
                });
            }

            calendario.appendChild(diaCelda);
        }

        botonMesAnterior.disabled = month <= hoy.getMonth() && year === hoy.getFullYear();
        botonMesPosterior.disabled = month >= fechaMaxima.getMonth() && year === fechaMaxima.getFullYear();
    }

    function llenarHoraSelect() {
        const fechaSeleccionada = fechaInput.value;
        if (!fechaSeleccionada) return;

        const horariosDisponibles = [
            '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
            '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM'
        ];

        horaSelect.innerHTML = '<option value="">Seleccione un horario</option>';
        horariosDisponibles.forEach(hora => {
            const opcion = document.createElement('option');
            opcion.value = hora;
            opcion.textContent = hora;
            horaSelect.appendChild(opcion);
        });
    }

    botonMesAnterior.addEventListener('click', function() {
        if (fechaActual.getMonth() > hoy.getMonth() || fechaActual.getFullYear() > hoy.getFullYear()) {
            fechaActual.setMonth(fechaActual.getMonth() - 1);
            crearCalendario(fechaActual.getFullYear(), fechaActual.getMonth());
        }
    });

    botonMesPosterior.addEventListener('click', function() {
        if (fechaActual.getMonth() < fechaMaxima.getMonth() || fechaActual.getFullYear() < fechaMaxima.getFullYear()) {
            fechaActual.setMonth(fechaActual.getMonth() + 1);
            crearCalendario(fechaActual.getFullYear(), fechaActual.getMonth());
        }
    });

    crearCalendario(fechaActual.getFullYear(), fechaActual.getMonth());
}
