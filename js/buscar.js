const d = document;
const datosDesdeLS = JSON.parse(localStorage.getItem("datos"));
const $nombreUsuario = d.querySelector(`[data-nombre-usuario]`);
const $cerrarSesion = d.querySelector(`[data-cerrar-sesion]`);
const $cerrarSesionMobile = d.querySelector(
    `[data-cerrar-sesion-mobile]`
  );


d.addEventListener("DOMContentLoaded", (e) => {
  const datosDesdeLS = JSON.parse(localStorage.getItem("datos"));

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
})


const datosDesdeLS3 = JSON.parse(localStorage.getItem("datos"));

d.addEventListener("keyup", (e) => {
  const palabraBuscada = (d.querySelector(`[data-busqueda]`).value).toLowerCase();
  console.log(palabraBuscada)
    

  const datosDesdeLS2 = JSON.parse(localStorage.getItem("datos"));
  const albunesFIltrados = datosDesdeLS2.catalogo.filter( (e) => (e.album.toLowerCase()).includes(palabraBuscada))
  const dondeVoyaDejarsoloLosFIltrados = d.querySelector('.grilla')

  dondeVoyaDejarsoloLosFIltrados.innerHTML = "";               
  for (const e of albunesFIltrados) {
    const album = `../paginas/musica-sonando.html?album=`
    const id_a = album.concat(e.id_album);
    dondeVoyaDejarsoloLosFIltrados.innerHTML +=
  `<article class="grilla-album">
    <a href="${id_a}">
    <img src="${e.imagen}" alt="" />
    </a>
  </article>`
}
})