const formulario = document.getElementById("form");
const inputs = document.querySelectorAll("#form input");
const textareas = document.querySelectorAll("#form textarea");

const nombre = document.querySelector("#input__nombre");
const apellido = document.querySelector("#input__apellido");
const error = document.getElementById("form__msg");
const errorP = document.querySelector("#error__p");
const success = document.getElementById("form__msg-success");

const expresiones = {
  nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
  correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
};

const campos = {
  nombre: false,
  apellido: false,
  email: false,
  mensaje: false,
};

const validarFormulario = (e) => {
  switch (e.target.name) {
    case "nombre":
      validarCampo(expresiones.nombre, e.target, "nombre");
      break;

    case "apellido":
      validarCampo(expresiones.nombre, e.target, "apellido");
      break;

    case "email":
      validarCampo(expresiones.correo, e.target, "email");
      break;

    case "mensaje":
      if (e.target.value.length > 10) {
        document
          .getElementById("input__mensaje")
          .classList.remove("form__error");
        document
          .getElementById("input__mensaje")
          .classList.add("form__correcto");
        document
          .querySelector("#grupo__mensaje .form__input-error")
          .classList.remove("form__input-error-activo");
        campos["mensaje"] = true;
      } else {
        document
          .getElementById("input__mensaje")
          .classList.remove("form__correcto");
        document.getElementById("input__mensaje").classList.add("form__error");
        document
          .querySelector("#grupo__mensaje .form__input-error")
          .classList.add("form__input-error-activo");
        campos["mensaje"] = false;
      }
      break;
  }
};

const validarCampo = (expresion, input, campo) => {
  if (expresion.test(input.value)) {
    document.getElementById(`input__${campo}`).classList.remove("form__error");
    document.getElementById(`input__${campo}`).classList.add("form__correcto");
    document
      .querySelector(`#grupo__${campo} .form__input-error`)
      .classList.remove("form__input-error-activo");
    campos[campo] = true;
  } else {
    document
      .getElementById(`input__${campo}`)
      .classList.remove("form__correcto");
    document.getElementById(`input__${campo}`).classList.add("form__error");
    document
      .querySelector(`#grupo__${campo} .form__input-error`)
      .classList.add("form__input-error-activo");
    campos[campo] = false;
  }
};

inputs.forEach((input) => {
  input.addEventListener("keyup", validarFormulario);
  input.addEventListener("blur", validarFormulario);
});

textareas.forEach((textarea) => {
  textarea.addEventListener("keyup", validarFormulario);
  textarea.addEventListener("blur", validarFormulario);
});

formulario.addEventListener("submit", (e) => {
  e.preventDefault();

  if (campos.nombre && campos.apellido && campos.email && campos.mensaje) {
    Email.send({
      Host: "mail.tresit.com.ar",
      Username: "contacto@tresit.com.ar",
      Password: "tresit2017",
      To: "contacto@tresit.com.ar",
      From: document.getElementById("input__email").value,
      Subject: `Mensaje de ${nombre.value} ${apellido.value}`,
      Body: document.getElementById("input__mensaje").value,
    }).then((message) => {
      if (message == "OK") {
        success.classList.add("form__msg-success-activo"),
          error.classList.remove("form__msg-activo"),
          setTimeout(() => {
            success.classList.remove("form__msg-success-activo");
          }, 5000),
          document.querySelectorAll(".form__correcto").forEach((green) => {
            green.classList.remove("form__correcto");
          });
      } else {
        errorP.innerText = "Se produjo un error, inténtelo de nuevo más tarde.";
        error.classList.add("form__msg-activo");
        setTimeout(() => {
          error.classList.remove("form__msg-activo");
          errorP.innerHTML =
            "<b>Error:</b> Por favor rellena el formulario correctamente.";
        }, 5000);

        document.querySelectorAll(".form__correcto").forEach((green) => {
          green.classList.remove("form__correcto");
        });
      }
    });
    formulario.reset();

    return false;
  } else {
    error.classList.add("form__msg-activo");
  }
});
