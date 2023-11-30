// objeto para almacenar resultados de la encuesta
const resultados = {};

// array para almacenar opciones de la encuesta
const opcionesArray = [];

// evento al hacer clic en "agregar opcion"
document.getElementById("agregarOpcion").addEventListener("click", function () {
    // captura la opcion ingresada por el usuario
    const opcionInput = document.getElementById("opcion");
    const opcion = opcionInput.value.trim();

    // agrega la opcion al array
    if (opcion) {
        opcionesArray.push(opcion);

        // agrega la opcion a la lista visual
        const listaOpciones = document.getElementById("listaOpciones");
        const nuevaOpcion = document.createElement("li");
        nuevaOpcion.textContent = opcion;
        listaOpciones.appendChild(nuevaOpcion);

        opcionInput.value = "";
    }
});

// evento al hacer clic en "generar encuesta"
document.getElementById("generarEncuesta").addEventListener("click", function () {
    // captura la pregunta ingresada por el usuario
    const pregunta = document.getElementById("pregunta").value;

    // genera el formulario de encuesta dinamicamente
    let encuestaHTML = "<h2>" + pregunta + "</h2>";
    encuestaHTML += "<form id='encuestaFormulario'>";

    for (let i = 0; i < opcionesArray.length; i++) {
        const opcion = opcionesArray[i];
        encuestaHTML += '<input type="radio" name="respuesta" value="' + opcion + '"> ' + opcion + '<br>';
        resultados[opcion] = 0;
    }

    encuestaHTML += '<button type="submit">Enviar Encuesta</button></form>';
    document.getElementById("encuestaGenerada").innerHTML = encuestaHTML;
    document.getElementById("volverARealizarEncuesta").style.display = "none";
    document.getElementById("listaOpciones").innerHTML = "";

    // agregar evento submit despues de generar el formulario
    document.getElementById("encuestaFormulario").addEventListener("submit", function (event) {
        event.preventDefault();
        // captura la respuesta seleccionada por el usuario
        const respuestaElegida = document.querySelector('input[name="respuesta"]:checked');

        // procesamiento esencial: actualiza los resultados y muestra los resultados
        if (respuestaElegida) {
            const opcionSeleccionada = respuestaElegida.value;
            resultados[opcionSeleccionada]++;
            mostrarResultados();
        }
    });
});

// funcion para mostrar resultados
function mostrarResultados() {
    let resultadosHTML = "<h2>Resultados de la Encuesta</h2>";
    resultadosHTML += "<ul>";

    // muestra los resultados
    for (const opcion in resultados) {
        resultadosHTML += "<li>" + opcion + ": " + resultados[opcion] + " votos</li>";
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
});