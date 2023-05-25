// Obtener referencias a los elementos del DOM
const displayValorAnterior = document.getElementById('valor-anterior');
const displayValorActual = document.getElementById('valor-actual');
const botonesNumeros = document.querySelectorAll('.numero');
const botonesOperadores = document.querySelectorAll('.operador');
const botonIgual = document.querySelector('.igual');
const botonBorrar = document.querySelector('.borrar');
const botonCE = document.querySelector('.ce');
const botonSigno = document.querySelector('.signo');
const botonComa = document.querySelector('.coma');

// Variables para realizar los cálculos
let valorAnterior = '';
let valorActual = '';
let operacion = undefined;

// Función para actualizar el valor en el display
function actualizarDisplay() {
  displayValorActual.textContent = valorActual;
  displayValorAnterior.textContent = valorAnterior;
}

// Función para agregar un número al valor actual
function agregarNumero(numero) {
  if (valorActual === '0') {
    valorActual = numero;
  } else {
    valorActual += numero;
  }
  actualizarDisplay();
}

// Función para agregar el signo +/- al número actual
function agregarSigno() {
  valorActual = (parseFloat(valorActual) * -1).toString();
  actualizarDisplay();
}

// Función para agregar la coma decimal al número actual
function agregarComa() {
  if (!valorActual.includes('.')) {
    valorActual += '.';
  }
  actualizarDisplay();
}

// Función para seleccionar la operación
function seleccionarOperacion(op) {
  if (valorActual === '') return;
  if (valorAnterior !== '') {
    calcular();
  }
  operacion = op;
  valorAnterior = valorActual;
  valorActual = '';
}

// Función para realizar los cálculos
function calcular() {
  let resultado;
  const anterior = parseFloat(valorAnterior);
  const actual = parseFloat(valorActual);
  if (isNaN(anterior) || isNaN(actual)) return;
  switch (operacion) {
    case '+':
      resultado = anterior + actual;
      break;
    case '-':
      resultado = anterior - actual;
      break;
    case 'x':
      resultado = anterior * actual;
      break;
    case '÷':
      resultado = anterior / actual;
      break;
    case '%':
      resultado = anterior % actual;
      break;
    default:
      return;
  }
  valorActual = resultado.toString();
  operacion = undefined;
  valorAnterior = '';
  actualizarDisplay();
}

// Función para borrar un dígito
function borrar() {
  valorActual = valorActual.slice(0, -1);
  actualizarDisplay();
}

// Función para borrar todo
function borrarTodo() {
  valorAnterior = '';
  valorActual = '0';
  operacion = undefined;
  actualizarDisplay();
}

// Agregar event listeners a los botones de números
botonesNumeros.forEach((boton) => {
  boton.addEventListener('click', () => {
    agregarNumero(boton.textContent);
  });
});

// Agregar event listeners a los botones de operadores
botonesOperadores.forEach((boton) => {
  boton.addEventListener('click', () => {
    seleccionarOperacion(boton.textContent);
  });
});

// Agregar event listener al botón igual
botonIgual.addEventListener('click', () => {
  calcular();
});

// Agregar event listener al botón de borrar
botonBorrar.addEventListener('click', () => {
  borrar();
});

// Agregar event listener al botón de borrar todo
botonCE.addEventListener('click', () => {
  borrarTodo();
});

// Agregar event listener al botón de signo +/-
botonSigno.addEventListener('click', () => {
  agregarSigno();
});

// Agregar event listener al botón de coma
botonComa.addEventListener('click', () => {
  agregarComa();
});
