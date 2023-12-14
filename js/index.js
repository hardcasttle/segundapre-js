// Recuperar opciones y resultados almacenados en localStorage
const opcionesGuardadas = JSON.parse(localStorage.getItem('opcionesArray')) || [];
const resultadosGuardados = JSON.parse(localStorage.getItem('resultados')) || {};

// objeto para almacenar resultados de la encuesta
const resultados = resultadosGuardados;

// array para almacenar opciones de la encuesta
const opcionesArray = opcionesGuardadas;

// función para guardar opciones y resultados en localStorage
function guardarEnLocalStorage() {
    localStorage.setItem('opcionesArray', JSON.stringify(opcionesArray));
    localStorage.setItem('resultados', JSON.stringify(resultados));
}

// evento al hacer clic en "agregar opcion"
document.getElementById("agregarOpcion").addEventListener("click", function () {
    // captura la opcion ingresada por el usuario
    const opcionInput = document.getElementById("opcion");
    const opcion = opcionInput.value.trim();

    // agrega la opcion al array y a la lista visual
    if (opcion) {
        opcionesArray.push(opcion);
        document.getElementById("listaOpciones").appendChild(document.createElement("li")).textContent = opcion;
        opcionInput.value = "";

        // guarda opciones en localStorage
        guardarEnLocalStorage();
    }
});

// evento al hacer clic en "generar encuesta"
document.getElementById("generarEncuesta").addEventListener("click", function () {
    // captura la pregunta ingresada por el usuario
    const pregunta = document.getElementById("pregunta").value;

    // genera el formulario de encuesta dinámicamente
    let encuestaHTML = `<h2>${pregunta}</h2><form id='encuestaFormulario'>`;

    opcionesArray.forEach(opcion => {
        encuestaHTML += `<input type="radio" name="respuesta" value="${opcion}"> ${opcion}<br>`;
        resultados[opcion] = resultados[opcion] || 0;
    });

    encuestaHTML += '<button type="submit">Enviar Encuesta</button></form>';
    document.getElementById("encuestaGenerada").innerHTML = encuestaHTML;
    document.getElementById("volverARealizarEncuesta").style.display = "none";
    document.getElementById("listaOpciones").innerHTML = "";

    // agregar evento submit después de generar el formulario
    document.getElementById("encuestaFormulario").addEventListener("submit", function (event) {
        event.preventDefault();
        // captura la respuesta seleccionada por el usuario
        const respuestaElegida = document.querySelector('input[name="respuesta"]:checked');

        // procesamiento esencial: actualiza los resultados y muestra los resultados
        respuestaElegida && (resultados[respuestaElegida.value]++, mostrarResultados());
        // guarda resultados en localStorage
        guardarEnLocalStorage();
    });
});

// función para mostrar resultados
function mostrarResultados() {
    let resultadosHTML = "<h2>Resultados de la Encuesta</h2><ul>";

    // muestra los resultados
    for (const opcion in resultados) {
        resultadosHTML += `<li>${opcion}: ${resultados[opcion]} votos</li>`;
    }

    resultadosHTML += "</ul>";
    document.getElementById("resultados").innerHTML = resultadosHTML;
    document.getElementById("volverARealizarEncuesta").style.display = "block";
}

// evento al hacer clic en "volver a realizar la encuesta"
document.getElementById("volverARealizarEncuesta").addEventListener("click", function () {
    // reinicia la interfaz para realizar otra encuesta
    document.getElementById("encuestaGenerada").innerHTML = "";
    document.getElementById("resultados").innerHTML = "";
    document.getElementById("volverARealizarEncuesta").style.display = "none";
    document.getElementById("listaOpciones").innerHTML = "";

    // reinicia el array de opciones
    opcionesArray.length = 0;

    // borra opciones y resultados de localStorage
    localStorage.removeItem('opcionesArray');
    localStorage.removeItem('resultados');
});