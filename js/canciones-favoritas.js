const d = document;
d.addEventListener("DOMContentLoaded", (e) => {
  const datosDesdeLS = JSON.parse(localStorage.getItem("datos"));
  const $nombreUsuario = d.querySelector(`[data-nombre-usuario]`);
  const $cerrarSesion = d.querySelector(`[data-cerrar-sesion]`);
  const $cerrarSesionMobile = d.querySelector(
    `[data-cerrar-sesion-mobile]`
  );

  const $mensajeAlbumVacio = d.querySelector(`[data-mensaje-vacio]`);
  const $table = d.querySelector(`[data-table]`);

  const $headerAvatar = d.querySelector(`[data-header-avatar]`);

  datosDesdeLS.usuarios.forEach((e) => {
    if (e.estado) {
      $headerAvatar.classList.remove("d-none");
      $headerAvatar.classList.add("d-flex");
      $nombreUsuario.textContent = e.usuario;
    }
  });

  //dibujar

  const $tbody = d.querySelector(`[data-tbody]`);
  const $template = d.getElementById(`template-fila`).content;
  const $fragment = d.createDocumentFragment();

  let arrIdCanciones = [];

  datosDesdeLS.usuarios.forEach((usuario) => {
    if (usuario.estado) {
      arrIdCanciones = usuario.favoritos.canciones;
    }
  });

  console.log(arrIdCanciones);

  //let arrCanciones = [];
  if (arrIdCanciones.length == 0) {
    $mensajeAlbumVacio.classList.remove(`d-none`);
    $mensajeAlbumVacio.classList.add(`d-block`);
    $table.classList.remove(`d-block`);
    $table.classList.add(`d-none`);
  } else {
    $table.classList.remove(`d-none`);
    $table.classList.add(`d-block`);
    $mensajeAlbumVacio.classList.remove(`d-block`);
    $mensajeAlbumVacio.classList.add(`d-none`);
  }

  arrIdCanciones.forEach((cancionFavorito) => {
    datosDesdeLS.catalogo.forEach((album) => {
      const arrCancionesFavoritos = album.canciones.filter(
        (cancion) => cancion.id_cancion == cancionFavorito
      );
      console.log(arrCancionesFavoritos);
      console.log(cancionFavorito);

      if (arrCancionesFavoritos.length != 0) {
        console.info(album);

        $template.querySelector(`[data-cancion]`).textContent =
          arrCancionesFavoritos[0].nombre;
        $template.querySelector(`[data-album]`).textContent = album.album;
        $template.querySelector(`[data-duracion]`).textContent =
          arrCancionesFavoritos[0].duracion;
        $template.querySelector(`[data-views]`).textContent =
          arrCancionesFavoritos[0].views;
        $template.querySelector(
          `[data-estrella-album]`
        ).dataset.idAlbum = `${album.id_album}`;
        $template.querySelector(
          `[data-estrella-cancion]`
        ).dataset.idCancion = `${arrCancionesFavoritos[0].id_cancion}`;

        datosDesdeLS.usuarios.forEach((usu) => {
          if (usu.estado) {
            //console.log(cancion.id_cancion)
            usu.favoritos.canciones.includes(
              arrCancionesFavoritos[0].id_cancion
            )
              ? ($template.querySelector(
                  `[data-estrella-cancion]`
                ).classList.value = `fa-solid fa-star`)
              : ($template.querySelector(
                  `[data-estrella-cancion]`
                ).classList.value = `fa-regular fa-star`);

            usu.favoritos.albums.includes(album.id_album)
              ? ($template.querySelector(
                  `[data-estrella-album]`
                ).classList.value = `fa-solid fa-star`)
              : ($template.querySelector(
                  `[data-estrella-album]`
                ).classList.value = `fa-regular fa-star`);
          }
        });

        let $clone = d.importNode($template, true);
        $fragment.appendChild($clone);
      }
    });
    $tbody.appendChild($fragment);
  });

  //dibujar
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

  //configurar estrellas album

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
                usuario.favoritos.albums =
                  usuario.favoritos.albums.filter(
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

  //configurar estrellas canciones

  const estrellasCancion = d.querySelectorAll(`[data-estrella-cancion]`);
  //console.log(estrellasCancion)

  estrellasCancion.forEach((el) => {
    el.addEventListener("click", (e) => {
      e.preventDefault();

      //console.log(el.dataset.idCancion)
      //console.log(e.target.dataset.idCancion)

      if (e.target.dataset.idCancion == el.dataset.idCancion) {
        const $estrellaCancionFavorito = e.target;

        datosDesdeLS.usuarios.forEach((usuario) => {
          if (usuario.estado) {
            if (
              usuario.favoritos.canciones.length == 0 ||
              !usuario.favoritos.canciones.includes(el.dataset.idCancion)
            ) {
              usuario.favoritos.canciones.push(el.dataset.idCancion);
              $estrellaCancionFavorito.classList.remove(`fa-regular`);
              $estrellaCancionFavorito.classList.add(`fa-solid`);
            } else {
              usuario.favoritos.canciones =
                usuario.favoritos.canciones.filter(
                  (item) => item != el.dataset.idCancion
                );
              $estrellaCancionFavorito.classList.remove(`fa-solid`);
              $estrellaCancionFavorito.classList.add(`fa-regular`);
            }

            localStorage.setItem("datos", JSON.stringify(datosDesdeLS));
            location.reload();
          }
        });
      }
    });
  });
});