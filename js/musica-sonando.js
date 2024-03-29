const d = document;

d.addEventListener("DOMContentLoaded", (e) => {
  const datosDesdeLS = JSON.parse(localStorage.getItem("datos"));
  const $nombreUsuario = d.querySelector(`[data-nombre-usuario]`);
  const $cerrarSesion = d.querySelector(`[data-cerrar-sesion]`);
  const $cerrarSesionMobile = d.querySelector(`[data-cerrar-sesion-mobile]`);

  const $headerAvatar = d.querySelector(`[data-header-avatar]`);

  datosDesdeLS.usuarios.forEach((e) => {
    if (e.estado) {
      $headerAvatar.classList.remove("d-none");
      $headerAvatar.classList.add("d-flex");
      $nombreUsuario.textContent = e.usuario;
    }
  });

  let albumActual = location.search.split("=").pop();

  const $tbody = d.querySelector(`[data-tbody]`);
  const $template = d.getElementById(`template-fila`).content;
  const $fragment = d.createDocumentFragment();

  datosDesdeLS.catalogo.forEach((e) => {
    if (e.id_album === albumActual) {
      e.canciones.forEach((cancion) => {
        $template.querySelector(`[data-cancion]`).textContent = cancion.nombre;
        $template.querySelector(`[data-album]`).textContent = e.album;
        $template.querySelector(`[data-duracion]`).textContent =
          cancion.duracion;
        $template.querySelector(`[data-views]`).textContent = cancion.views;
        $template.querySelector(
          `[data-estrella-album]`
        ).dataset.idAlbum = `${e.id_album}`;
        $template.querySelector(
          `[data-estrella-cancion]`
        ).dataset.idCancion = `${cancion.id_cancion}`;

        datosDesdeLS.usuarios.forEach((usu) => {
          if (usu.estado) {
            usu.favoritos.canciones.includes(cancion.id_cancion)
              ? ($template.querySelector(
                  `[data-estrella-cancion]`
                ).classList.value = `fa-solid fa-star`)
              : ($template.querySelector(
                  `[data-estrella-cancion]`
                ).classList.value = `fa-regular fa-star`);

            usu.favoritos.albums.includes(e.id_album)
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
      });

      $tbody.appendChild($fragment);
    }
  });

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

  //configurar botones play

  const botonesPlay = d.querySelectorAll(`[data-boton-play]`)

  console.log(botonesPlay)

  botonesPlay.forEach((el) => {
    el.addEventListener('click', (e) => {
      e.preventDefault()

      console.log(albumActual)

      datosDesdeLS.catalogo.forEach((album) => {
        if(albumActual == album.id_album){

          datosDesdeLS.usuarios.forEach((usuario) => {
            if (usuario.estado) {
              
              usuario.escuchando.album = album.album
              usuario.escuchando.img = album.imagen
              usuario.escuchando.descripcion = album.descripcion
              usuario.escuchando.id_album = album.id_album

              localStorage.setItem("datos", JSON.stringify(datosDesdeLS));
              location.reload()
            }
          });

        }
      })
    })
  })






  //configurar botones play


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
                usuario.favoritos.albums = usuario.favoritos.albums.filter(
                  (item) => item != el.id_album
                );
                $estrellaAlbumFavorito.classList.remove(`fa-solid`);
                $estrellaAlbumFavorito.classList.add(`fa-regular`);
              }

              localStorage.setItem("datos", JSON.stringify(datosDesdeLS));
              location.reload()
            }
          });
        }
      });
    });
  });

  //configurar estrellas canciones

  const estrellasCancion = d.querySelectorAll(`[data-estrella-cancion]`);

  estrellasCancion.forEach((el) => {
    el.addEventListener("click", (e) => {
      e.preventDefault();

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
              usuario.favoritos.canciones = usuario.favoritos.canciones.filter(
                (item) => item != el.dataset.idCancion
              );
              $estrellaCancionFavorito.classList.remove(`fa-solid`);
              $estrellaCancionFavorito.classList.add(`fa-regular`);
            }

            localStorage.setItem("datos", JSON.stringify(datosDesdeLS));
          }
        });
      }
    });
  });
});
