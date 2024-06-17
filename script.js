//SLIDE

const sliderContainer = documet.getElementById('slider-container');
const slider = document.getElementById('slider');
const buttonLeft = document.getElementById('button-left');
const buttonRight = document.getElementById('button-right');


// SERVICIOS
// document.addEventListener('DOMContentLoaded', () => {
//     const servicios = document.querySelectorAll('.servicio');

//     servicios.forEach(servicio => {
//         servicio.addEventListener('click', () => {
//             const info = servicio.querySelector('p');
//             if (info.style.display === 'block') {
//                 info.style.display = 'none';
//             } else {
//                 info.style.display = 'block';
//             }
//         });
//     });
// });

// EQUIPO MEDICO

function togglePerfil(element) {
    element.classList.toggle("active");
}