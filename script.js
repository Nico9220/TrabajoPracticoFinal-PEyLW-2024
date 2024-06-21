//SLIDE

const sliderContainer = document.getElementById('slider-container');
const slider = document.getElementById('slider');
const buttonLeft = document.getElementById('button-left');
const buttonRight = document.getElementById('button-right');

// EQUIPO MEDICO

function togglePerfil(element) {
    element.classList.toggle("active");
}

// FORMULARIO
const colorCampoCorrecto = "#74ef7a40";
const colorCampoIncorrecto = "#ff002030";
const regexNumerico = /^\d+$/;
const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validar() {
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

    const esValido = nombreValido && apellidoValido && emailValido && telefonoValido &&
                    fechaValida && horaValida && obraSocialValida;

    if (esValido) {
        alert("Todos los datos son correctos");
    } 
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

document.addEventListener('DOMContentLoaded', function() {
    const formulario = document.getElementById('reservaForm');
    
    formulario.addEventListener('submit', function(event) {
        event.preventDefault();
        
        if (validar()) {
            formulario.reset();
        } 
    });
});


// CALENDARIO
/**
 * Con el método .addEventListener() permite añadir una escucha del evento indicado (primer parámetro), y en el caso de que ocurra, se ejecutará la función asociada indicada (segundo parámetro).
 */
document.addEventListener('DOMContentLoaded', function() {
    const calendario = document.getElementById('calendar');
    const fechaInput = document.getElementById('fecha');
    const horaSelect = document.getElementById('hora');
    const formulario = document.getElementById('reservaForm');
    const botonMesAnterior = document.getElementById('mesAnterior');
    const botonMesPosterior = document.getElementById('mesPosterior');

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

    formulario.addEventListener('submit', function(event) {
        event.preventDefault();
        const formData = new FormData(formulario);
        const datos = Object.fromEntries(formData.entries());
    });
});

