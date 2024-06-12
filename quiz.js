// script.js

// Array de preguntas
const preguntas = [
    {
        pregunta: "¿Cuál es la capital de Francia?",
        respuestas: [
            { texto: "A. Berlín", correcto: false },
            { texto: "B. Madrid", correcto: false },
            { texto: "C. París", correcto: true },
            { texto: "D. Lisboa", correcto: false }
        ]
    },
    {
        pregunta: "¿Qué planeta es conocido como el Planeta Rojo?",
        respuestas: [
            { texto: "A. Tierra", correcto: false },
            { texto: "B. Marte", correcto: true },
            { texto: "C. Júpiter", correcto: false },
            { texto: "D. Saturno", correcto: false }
        ]
    },
    {
        pregunta: "¿Cuál es el río más largo del mundo?",
        respuestas: [
            { texto: "A. Amazonas", correcto: true },
            { texto: "B. Nilo", correcto: false },
            { texto: "C. Yangtsé", correcto: false },
            { texto: "D. Misisipi", correcto: false }
        ]
    },
    {
        pregunta: "¿En qué año llegó el hombre a la luna?",
        respuestas: [
            { texto: "A. 1965", correcto: false },
            { texto: "B. 1969", correcto: true },
            { texto: "C. 1972", correcto: false },
            { texto: "D. 1959", correcto: false }
        ]
    },
    {
        pregunta: "¿Cuál es el animal terrestre más rápido?",
        respuestas: [
            { texto: "A. Guepardo", correcto: true },
            { texto: "B. León", correcto: false },
            { texto: "C. Tigre", correcto: false },
            { texto: "D. Elefante", correcto: false }
        ]
    },
    {
        pregunta: "¿Quién escribió 'Cien años de soledad'?",
        respuestas: [
            { texto: "A. Gabriel García Márquez", correcto: true },
            { texto: "B. Mario Vargas Llosa", correcto: false },
            { texto: "C. Pablo Neruda", correcto: false },
            { texto: "D. Julio Cortázar", correcto: false }
        ]
    },
    {
        pregunta: "¿Cuál es el océano más grande del mundo?",
        respuestas: [
            { texto: "A. Atlántico", correcto: false },
            { texto: "B. Índico", correcto: false },
            { texto: "C. Ártico", correcto: false },
            { texto: "D. Pacífico", correcto: true }
        ]
    },
    {
        pregunta: "¿Qué instrumento musical tiene cuerdas y se toca con un arco?",
        respuestas: [
            { texto: "A. Piano", correcto: false },
            { texto: "B. Violín", correcto: true },
            { texto: "C. Trompeta", correcto: false },
            { texto: "D. Flauta", correcto: false }
        ]
    }
];

// Variables necesarias
let indicePreguntaActual = 0;
let puntaje = 0;
let nombreEstudiante = '';
let cursoEstudiante = '';

// Elementos del DOM
const formularioInicial = document.getElementById('formulario-inicial');
const contenedorFormulario = document.getElementById('contenedor-formulario');
const contenedorQuiz = document.getElementById('contenedor-quiz');
const elementoPregunta = document.getElementById('pregunta');
const botonesRespuestas = document.getElementById('respuestas');
const botonSiguiente = document.getElementById('boton-siguiente');
const botonResultados = document.getElementById('boton-resultados');

// Función para comenzar el quiz
function comenzarQuiz() {
    indicePreguntaActual = 0;
    puntaje = 0;
    botonSiguiente.style.display = 'none';
    botonResultados.style.display = 'none';
    mostrarPregunta(preguntas[indicePreguntaActual]);
}

// Función para mostrar una pregunta
function mostrarPregunta(pregunta) {
    elementoPregunta.innerText = pregunta.pregunta;
    botonesRespuestas.innerHTML = '';
    pregunta.respuestas.forEach((respuesta, index) => {
        const boton = document.createElement('button');
        boton.innerText = respuesta.texto;
        boton.classList.add('boton-respuesta');
        if (respuesta.correcto) {
            boton.dataset.correcto = respuesta.correcto;
        }
        boton.addEventListener('click', seleccionarRespuesta);
        botonesRespuestas.appendChild(boton);
    });
}

// Función para seleccionar una respuesta
function seleccionarRespuesta(e) {
    const botonSeleccionado = e.target;
    const correcto = botonSeleccionado.dataset.correcto === "true";
    if (correcto) {
        puntaje++;
    }
    Array.from(botonesRespuestas.children).forEach(boton => {
        establecerClaseEstado(boton, boton.dataset.correcto === "true");
    });
    botonSiguiente.style.display = 'block';
}

// Función para establecer la clase de estado
function establecerClaseEstado(elemento, correcto) {
    limpiarClaseEstado(elemento);
    if (correcto) {
        elemento.classList.add('correcto');
    } else {
        elemento.classList.add('incorrecto');
    }
}

// Función para limpiar las clases de estado
function limpiarClaseEstado(elemento) {
    elemento.classList.remove('correcto');
    elemento.classList.remove('incorrecto');
}

// Función para manejar el botón siguiente
function manejarBotonSiguiente() {
    indicePreguntaActual++;
    if (indicePreguntaActual < preguntas.length) {
        mostrarPregunta(preguntas[indicePreguntaActual]);
        botonSiguiente.style.display = 'none';
    } else {
        botonSiguiente.style.display = 'none';
        botonResultados.style.display = 'block';
    }
}

// Función para mostrar resultados
function mostrarResultados() {
    alert(`Estudiante: ${nombreEstudiante}\nCurso: ${cursoEstudiante}\nTu puntaje es ${puntaje} de ${preguntas.length}`);
    comenzarQuiz();
}

// Función para manejar el formulario inicial
function manejarFormularioInicial(e) {
    e.preventDefault();
    nombreEstudiante = document.getElementById('nombre').value;
    cursoEstudiante = document.getElementById('curso').value;
    contenedorFormulario.style.display = 'none';
    contenedorQuiz.style.display = 'block';
    comenzarQuiz();
}

// Eventos
formularioInicial.addEventListener('submit', manejarFormularioInicial);
botonSiguiente.addEventListener('click', manejarBotonSiguiente);
botonResultados.addEventListener('click', mostrarResultados);

// Iniciar el quiz
comenzarQuiz();


