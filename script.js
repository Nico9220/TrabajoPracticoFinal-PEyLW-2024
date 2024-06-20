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
        
        // Aquí iría la lógica de verificación de disponibilidad y envío de confirmación
        alert(`Reserva enviada para ${datos.nombre} el ${datos.fecha} a las ${datos.hora}. Confirmación enviada a ${datos.email}.`);

        // Simulación de envío de correo electrónico/mensaje de texto
        console.log(`Enviando confirmación a ${datos.email} y ${datos.telefono}...`);
    });
});

