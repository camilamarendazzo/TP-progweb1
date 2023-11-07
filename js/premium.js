const d = document;
const $nombreUsuario = d.querySelector(`[data-nombre-usuario]`);
const $cerrarSesion = d.querySelector(`[data-cerrar-sesion]`);
const $cerrarSesionMobile = d.querySelector(
  `[data-cerrar-sesion-mobile]`
);

d.addEventListener("DOMContentLoaded", (e) => {
  const datosDesdeLS = JSON.parse(localStorage.getItem("datos"));

  console.log(datosDesdeLS);

  const $headerAvatar = d.querySelector(`[data-header-avatar]`);

  datosDesdeLS.usuarios.forEach((e) => {
  if (e.estado) {
    $headerAvatar.classList.remove("d-none");
    $headerAvatar.classList.add("d-flex");
    $nombreUsuario.textContent = e.usuario;
  }
});

  d.addEventListener("click", (e) => {
    if (e.target == $cerrarSesion) {
      e.preventDefault();
      console.log("cerraste sesion");
      datosDesdeLS.usuarios.forEach((e) => {
        if (e.estado) {
          e.estado = false;
        }
      });

      localStorage.setItem("datos", JSON.stringify(datosDesdeLS));
      location.href = "../../index.html";
    }
  });
});