const d = document;

const dividirContraseña = (contraseña) => {
  const mitad = contraseña.length / 2;

  const parte1 = contraseña.slice(0, mitad);
  const parte2 = contraseña.slice(mitad, contraseña.length);

  return parte2 + parte1;
};

const mostrarMensajeError = (formulario, nodoMensaje) => {
  nodoMensaje.classList.add("mostrar");

  setTimeout(() => {
    nodoMensaje.classList.remove("mostrar");
    formulario.reset();
  }, 3000);
};

d.addEventListener("DOMContentLoaded", (e) => {
  const datosDesdeLS = JSON.parse(localStorage.getItem("datos"));

  if (!datosDesdeLS) {
    localStorage.setItem("datos", JSON.stringify(data));
    location.reload();
  }

  d.addEventListener("submit", (e) => {
    e.preventDefault();

    const $formulario = d.querySelector(`[data-formulario]`);
    const dataUsuario = d.querySelector(`[data-usuario]`).value;
    const dataContraseña = d.querySelector(`[data-contraseña]`).value;
    const $mensajeErrorIncorrecto = d.querySelector(`[data-mensaje]`);
    const $mensajeError = d.querySelector(`[data-mensaje-registrarse]`);
    if (datosDesdeLS.usuarios.length == 0) {
      mostrarMensajeError($formulario, $mensajeError);
    } else {
      let bandera = true;

      const dataContraseñaFinal = dividirContraseña(dataContraseña);

      datosDesdeLS.usuarios.forEach((el) => {
        if (
          dataUsuario === el.usuario &&
          dataContraseñaFinal === el.contraseña
        ) {
          bandera = false;
          el.estado = true;
          $formulario.reset();

          localStorage.setItem("datos", JSON.stringify(datosDesdeLS));
          location.href = "views/paginas/inicio.html";
        }
      });
      if (bandera) {
        mostrarMensajeError($formulario, $mensajeErrorIncorrecto);
      }
    }
  });
});
