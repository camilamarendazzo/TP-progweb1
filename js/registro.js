const d = document;

const mostrarMensaje = (nodoMensaje) => {
  nodoMensaje.classList.remove(`ocultar`);
  nodoMensaje.classList.add(`mostrar`);

  setTimeout(() => {
    nodoMensaje.classList.remove(`mostrar`);
    nodoMensaje.classList.add(`ocultar`);
  }, 3000);
};

const dividirContraseña = (contraseña) => {
  const mitad = contraseña.length / 2;

  const parte1 = contraseña.slice(0, mitad);
  const parte2 = contraseña.slice(mitad, contraseña.length);

  return parte2 + parte1;
};

const datosDesdeLS = JSON.parse(localStorage.getItem("datos"));
const $btnPremium = d.querySelector(`[data-id="registro-premium"]`);
const $btnSesion = d.querySelector(`[data-id="registro-sesion"]`);
const $formulario = d.querySelector(`[data-id="registro-formulario"]`);

d.addEventListener("DOMContentLoaded", (e) => {
  d.addEventListener("click", (e) => {
    if (e.target == $btnPremium) {
      e.preventDefault();
      location.href = "premium.html";
    }

    if (e.target == $btnSesion) {
      e.preventDefault();
      location.href = "../../index.html";
    }
  });

  d.addEventListener("submit", (e) => {
    if (e.target == $formulario) {
      e.preventDefault();

      const dataUsuario = d.querySelector(`[data-usuario]`).value;
      const dataContraseña = d.querySelector(`[data-contraseña]`).value;
      const dataRepetirContraseña = d.querySelector(
        `[data-repetir-contraseña]`
      ).value;
      const dataNacimiento = d.querySelector(`[data-nacimiento]`).value;
      const dataEmail = d.querySelector(`[data-email]`).value;
      const mensajeExito = d.querySelector(`[data-mensaje-exito]`);
      const mensajeError = d.querySelector(`[data-mensaje-error]`);
      const mensajeErrorUsuario = d.querySelector(
        `[data-mensaje-error-usuario]`
      );
      if (dataContraseña === dataRepetirContraseña) {
        const dataContraseñaFinal = dividirContraseña(dataContraseña);

        const datosUsuario = {
          id_usuario: `${datosDesdeLS.usuarios.length + 1}`,
          usuario: `${dataUsuario}`,
          contraseña: `${dataContraseñaFinal}`,
          repetirContraseña: `${dataContraseñaFinal}`,
          estado: false,
          nacimiento: `${dataNacimiento}`,
          email: `${dataEmail}`,
          premium : false,
          escuchando: {
            "album": `${datosDesdeLS.catalogo[0].album}`,
            "img":`${datosDesdeLS.catalogo[0].imagen}`,
            "descripcion": `${datosDesdeLS.catalogo[0].descripcion}`,
            "id_album": `${datosDesdeLS.catalogo[0].id_album}`
          },
          favoritos: {
            albums: [],
            canciones: [],
          },
        };

        if (datosDesdeLS.usuarios.length !== 0) {
          datosDesdeLS.usuarios.forEach((el) => {
            if (el.usuario !== datosUsuario.usuario) {
              datosDesdeLS.usuarios.push(datosUsuario);

              localStorage.setItem("datos", JSON.stringify(datosDesdeLS));
              mostrarMensaje(mensajeExito);

              $formulario.reset();
            } else {
              mostrarMensaje(mensajeErrorUsuario);
            }
          });
        } else {
          datosDesdeLS.usuarios.push(datosUsuario);
          localStorage.setItem("datos", JSON.stringify(datosDesdeLS));
          mostrarMensaje(mensajeExito);
          $formulario.reset();
        }
      } else {
        mostrarMensaje(mensajeError);
      }
    }
  });
});
