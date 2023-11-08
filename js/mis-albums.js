const d = document;

d.addEventListener("DOMContentLoaded", (e) => {
  const datosDesdeLS = JSON.parse(localStorage.getItem("datos"));

  const $nombreUsuario = d.querySelector(`[data-nombre-usuario]`);
  const $cerrarSesion = d.querySelector(`[data-cerrar-sesion]`);
  const $cerrarSesionMobile = d.querySelector(`[data-cerrar-sesion-mobile]`);
  const $mensajeAlbumVacio = d.querySelector(`[data-mensaje-vacio]`);
  const $headerAvatar = d.querySelector(`[data-header-avatar]`);

  datosDesdeLS.usuarios.forEach((e) => {
    if (e.estado) {
      $headerAvatar.classList.remove("d-none");
      $headerAvatar.classList.add("d-flex");
      $nombreUsuario.textContent = e.usuario;
    }
  });

  //dibujar cuadricula

  const $grilla = d.querySelector(`[data-grilla]`);
  const $template = d.getElementById(`template-album`).content;
  const $fragment = d.createDocumentFragment();

  let arrAlbums = [];

  datosDesdeLS.usuarios.forEach((usuario) => {
    if (usuario.estado) {
      arrAlbums = usuario.favoritos.albums;
    }
  });

  if (arrAlbums.length == 0) {
    $mensajeAlbumVacio.classList.remove(`d-none`);
    $mensajeAlbumVacio.classList.add(`d-block`);
  } else {
    $mensajeAlbumVacio.classList.remove(`d-block`);
    $mensajeAlbumVacio.classList.add(`d-none`);
  }

  arrAlbums.forEach((albumFavorito) => {
    const arrAlbumsFavoritos = datosDesdeLS.catalogo.filter(
      (album) => album.id_album == albumFavorito
    );

    $template.querySelector(
      "a"
    ).href = `musica-sonando.html?album=${arrAlbumsFavoritos[0].id_album}`;
    $template.querySelector("img").src = `${arrAlbumsFavoritos[0].imagen}`;
    $template.querySelector(
      "i"
    ).dataset.idAlbum = `${arrAlbumsFavoritos[0].id_album}`;

    datosDesdeLS.usuarios.forEach((usu) => {
      if (usu.estado) {
        usu.favoritos.albums.includes(arrAlbumsFavoritos[0].id_album)
          ? ($template.querySelector("i").classList.value = `fa-solid fa-star`)
          : ($template.querySelector(
              "i"
            ).classList.value = `fa-regular fa-star`);
      }
    });

    let $clone = d.importNode($template, true);
    $fragment.appendChild($clone);
  });

  $grilla.appendChild($fragment);

  //dibujar cuadricula

  //dibujar aside

  
  const $asideImg = d.querySelector(`[data-aside-imagen]`);
  const $asideDescripcion = d.querySelector(`[data-aside-descripcion]`);
  const $asideEstrella = d.querySelector(`.aside-foto-div i`);

  console.log($asideEstrella)

  datosDesdeLS.usuarios.forEach((usuario) => {
    if (usuario.estado) {
              
                $asideImg.setAttribute('src',`${usuario.escuchando.img}`)
                $asideImg.setAttribute('alt',`${usuario.escuchando.album}`)

                $asideEstrella.dataset.idAlbum = `${usuario.escuchando.id_album}`
              
                $asideDescripcion.textContent = `${usuario.escuchando.descripcion}`
              
              
            }
          });

  //dibujar aside

  d.addEventListener("click", (e) => {
    if (e.target == $cerrarSesion || e.target == $cerrarSesionMobile) {
      e.preventDefault();

      datosDesdeLS.usuarios.forEach((e) => {
        if (e.estado) {
          e.estado = false;
        }
      });

      localStorage.setItem("datos", JSON.stringify(datosDesdeLS));
      location.href = "../../index.html";
    }
  });

  const estrellasAlbum = d.querySelectorAll(`[data-estrella-album]`);

  estrellasAlbum.forEach((el) => {
    el.addEventListener("click", (e) => {
      e.preventDefault();

      datosDesdeLS.catalogo.forEach((el) => {
        if (e.target.dataset.idAlbum == el.id_album) {
          const $estrellaAlbumFavorito = e.target;

          datosDesdeLS.usuarios.forEach((usuario) => {
            if (usuario.estado) {
              if (
                usuario.favoritos.albums.length == 0 ||
                !usuario.favoritos.albums.includes(el.id_album)
              ) {
                usuario.favoritos.albums.push(el.id_album);
                $estrellaAlbumFavorito.classList.remove(`fa-regular`);
                $estrellaAlbumFavorito.classList.add(`fa-solid`);
              } else {
                usuario.favoritos.albums = usuario.favoritos.albums.filter(
                  (item) => item != el.id_album
                );
                $estrellaAlbumFavorito.classList.remove(`fa-solid`);
                $estrellaAlbumFavorito.classList.add(`fa-regular`);
              }

              localStorage.setItem("datos", JSON.stringify(datosDesdeLS));
              location.reload();
            }
          });
        }
      });
    });
  });
});
