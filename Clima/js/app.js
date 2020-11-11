const container = document.querySelector('.container'); // Container completo, lo utilizamos para asignarle un child de alerta.
const resultado = document.querySelector('#resultado'); // Resultado, muestra el log de la API.
const formulario = document.querySelector('#formulario'); // Formulario, con su respectivo submit.


formulario.addEventListener('submit', clima); // Listener de tipo submit, ejecuta la función para buscar el clima en la API.

function clima(e){

    e.preventDefault();
 
    // Campos obligatorios a rellenar.

    const ciudad = document.querySelector('#ciudad').value; 
    const pais = document.querySelector('#pais').value;

    // Creamos una estructura de control para verificar que los campos esten completos.

    if(ciudad === '' || pais === ''){

        // Mostramos un error si alguno de los dos no se encuentra completo.

        mostrarError('Ambos campos son obligatorios!');

        return;

    }

    // Invocamos la función para consultar por la API, cuando se ejecute el listener en submit.

    consultarAPI(ciudad, pais);

}

function mostrarError(mensaje){

    const alerta = document.querySelector('.bg-red-100');

    if(!alerta){ // En el caso de que no exista una alerta activa...

        const alerta = document.createElement('div'); // Creamos una, como una div.

        // Le brindamos sus elementos esteticos via class e innerHTML.

        alerta.classList.add('bg-red-100', 'border-red-400', 'text-red-700', 'px-4', 'py-3', 'rounded', 'max-w-md', 'mx-auto', 'mt-6', 'text-center');

        // Asignamos el parametro mensaje al contenido del bloque.

        alerta.innerHTML = `
            <strong class="font-bold">Error!</strong>
            <span class="block">${mensaje}</span>
        `;

        container.appendChild(alerta); // Finalmente, asignamos a nuestra alerta como children del container.

        // Utilizamos timeout para eliminar la alerta en 2.5 segundos.

        setTimeout(() =>{
            alerta.remove();
        }, 2500);

    }

}

// -------------------------------------------------------------- API -------------------------------------------------------------- //

function consultarAPI(ciudad, pais) {

    const appId = 'd4ded8a5e600be7f7b4755f520cdbd89'; // API key.

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appId}`; // API url.


    Spinner(); // Muestra un spinner de carga.

    fetch(url) // Comenzamos con fetch.
        .then( respuesta => respuesta.json())
        .then( datos =>{

            console.log(datos);

            limpiarHTML(); // Limpiar el HTML previo.

            if(datos.cod === "404"){ // Revisamos que los datos sean correctos.

                mostrarError('Ciudad no encontrada') // Display de error.

                return;

            }

            // Imprime la respuesta en el HTML.

            mostrarClima(datos);

        })

}


function mostrarClima(datos){

    const { name, main: { temp, temp_max, temp_min } } = datos;

    const centigrados = kelvinACentigrados(temp);
    const max = kelvinACentigrados(temp_max);
    const min = kelvinACentigrados(temp_min);

    const nombreCiudad = document.createElement('p');
    nombreCiudad.textContent = `Clima en ${name}`;
    nombreCiudad.classList.add('font-bold', 'text-2xl');

    const actual = document.createElement('p');
    actual.innerHTML = `${centigrados} &#8451;`;
    actual.classList.add('font-bold', 'text-6xl');

    const tempMaxima = document.createElement('p');
    tempMaxima.innerHTML = `Max: ${max} &#8451;`;
    tempMaxima.classList.add('text-xl');

    const tempMinima = document.createElement('p');
    tempMinima.innerHTML = `Min: ${min} &#8451;`;
    tempMinima.classList.add('text-xl');

    const resultadoDiv = document.createElement('div');
    resultadoDiv.classList.add('text-center', 'text-white');
    resultadoDiv.appendChild(nombreCiudad);
    resultadoDiv.appendChild(actual);
    resultadoDiv.appendChild(tempMaxima);
    resultadoDiv.appendChild(tempMinima);

    resultado.appendChild(resultadoDiv); // Asignamos el resultado como children de la div.

}

const kelvinACentigrados = grados => parseInt(grados - 273.15);

function limpiarHTML(){

    while(resultado.firstChild){

        resultado.removeChild(resultado.firstChild);

    }

}

// Spinner.

function Spinner(){

    limpiarHTML();

    const divSpinner = document.createElement('div');
    divSpinner.classList.add('sk-fading-circle');

    divSpinner.innerHTML = `
        <div class="sk-circle1 sk-circle"></div>
        <div class="sk-circle2 sk-circle"></div>
        <div class="sk-circle3 sk-circle"></div>
        <div class="sk-circle4 sk-circle"></div>
        <div class="sk-circle5 sk-circle"></div>
        <div class="sk-circle6 sk-circle"></div>
        <div class="sk-circle7 sk-circle"></div>
        <div class="sk-circle8 sk-circle"></div>
        <div class="sk-circle9 sk-circle"></div>
        <div class="sk-circle10 sk-circle"></div>
        <div class="sk-circle11 sk-circle"></div>
        <div class="sk-circle12 sk-circle"></div>
    `;

    resultado.appendChild(divSpinner);
    
}