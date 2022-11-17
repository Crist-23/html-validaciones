// const inputNacimiento = document.querySelector("#birth"); // no es una buena practica

// inputNacimiento.addEventListener("blur", (event) => {
//   validarNacimiento(event.target);
// }); MALA PRACTICA

export function valida(input) {
  const tipoDeInput = input.dataset.tipo;
  // se manda a llamar cada vez que el usuario salga del input que estaba rellenando
  if (validadores[tipoDeInput]) {
    //classlist buscar
    validadores[tipoDeInput](input);
  }
  // console.log(input.parentElemt);
  if (input.validity.valid) {
    input.parentElement.classList.remove("input-container--invalid");
    input.parentElement.querySelector(".input-message-error").innerHTML = "";
  } else {
    input.parentElement.classList.add("input-container--invalid");
    input.parentElement.querySelector(".input-message-error").innerHTML =
      mostrarMensajeDeError(tipoDeInput, input);
  }
}
const tipoDeErrores = [
  "valueMissing",
  "typeMismatch",
  "patternMismatch",
  "customError",
];

const mensajesDeError = {
  nombre: {
    valueMissing: "El campo nombre no puede estar vacio",
  },
  email: {
    valueMissing: "El campo email no puede estar vacio",
    typeMismatch: "El correo no es válido",
  },
  password: {
    valueMissing: "El campo password no puede estar vacio",
    patternMismatch:
      "Al menos 6 caracteres, máximo 12 y debe contener una letra minúscula, una letra mayúscula, un número y no puede contener caracteres especiales",
  },
  nacimiento: {
    valueMissing: "El campo nacimiento no puede estar vacio",
    customError: " Debes tener al menos 18 años de edad",
  },
  numero: {
    valueMissing: "Este campo no puede estar vacio",
    patternMismatch: "El formato requerido xxxxxxxxxx 10 numeros",
  },
  direccion: {
    valueMissing: "Este campo no puede estar vacio",
    patternMismatch: "La dirreción debe contener entre 10 a 40 caracteres",
  },
  Ciudad: {
    valueMissing: "Este campo no puede estar vacio",
    patternMismatch: "La ciudad debe contener entre 10 a 40 caracteres",
  },
  Estado: {
    valueMissing: "Este campo no puede estar vacio",
    patternMismatch: "La estado debe contener entre 10 a 40 caracteres",
  },
};

const validadores = {
  nacimiento: (input) => validarNacimiento(input), // arrow funtion
};
function mostrarMensajeDeError(tipoDeInput, input) {
  let mensaje = "";
  tipoDeErrores.forEach((error) => {
    if (input.validity[error]) {
      console.log(input.validity[error]);
      mensaje = mensajesDeError[tipoDeInput][error];
    }
  });
  return mensaje;
}
function validarNacimiento(input) {
  const fechaCliente = new Date(input.value);
  let mensaje = "";
  if (!mayorDeEdad(fechaCliente)) {
    mensaje = "Debes tener al menos 18 años";
  }

  input.setCustomValidity(mensaje);
}

function mayorDeEdad(fecha) {
  const fechaDeHoy = new Date();
  console.log(fecha, "---", fechaDeHoy);
  const diferenciaFechas = new Date(
    fecha.getUTCFullYear() + 18,
    fecha.getUTCMonth(),
    fecha.getUTCDate()
  );
  return diferenciaFechas <= fechaDeHoy;
  //   console.log(fecha, "-----------", fechaHoy);
}
