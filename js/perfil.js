const d = document;
const datosDesdeLS = JSON.parse(localStorage.getItem("datos"));
const $nombreUsuario = d.querySelector(`[data-nombre-usuario]`);
const $cerrarSesion = d.querySelector(`[data-cerrar-sesion]`);
const $cerrarSesionMobile = d.querySelector(`[data-cerrar-sesion-mobile]`);
const $linkPremium = d.querySelector(`[data-link-premium]`);

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
  })});

  datosDesdeLS.usuarios.forEach((e) => {
    if (e.estado && e.premium) {
      $linkPremium.classList.remove('d-block')
      $linkPremium.classList.add('d-none')
    } else {
      $linkPremium.classList.remove('d-none')
      $linkPremium.classList.add('d-block')
    }
  });
  
  const eliminarUs = d.querySelector(`[data-eliminar-usuario]`);

d.addEventListener("click" , (e) => {
  if (e.target == eliminarUs){
    e.preventDefault();
    // Paso 2: Encuentra el objeto que cumple con la condición (estado = true)
    const objetoAEliminar = datosDesdeLS.usuarios.find(item => item.estado === true);
    
    if (objetoAEliminar) {
      // Paso 3: Elimina el objeto del array
      const index = datosDesdeLS.usuarios.indexOf(objetoAEliminar);
      datosDesdeLS.usuarios.splice(index, 1);
    
      // Paso 4: Actualiza el almacenamiento local con los datos modificados
      localStorage.setItem('datos', JSON.stringify(datosDesdeLS));
      location.href = "../../index.html";
    } else {
      console.log('No se encontró ningún objeto con estado = true');
    };
    }});




d.addEventListener("submit", (e) => {
  console.log(e);
 let btn = d.querySelector(`[data-guardar-usuario]`)
  if (e.target == btn) {
    e.preventDefault();
     //Mostrar modal 
    const modal = d.getElementById("modal");
    modal.style.display = "block";
    guardarDatos();
    localStorage.setItem("datos", JSON.stringify(datosDesdeLS));
}});

  let $guardar = d.querySelector(`[data-guardar-usuario]`);

  function guardarDatos (){
    let usuarioForm = d.querySelector(`[usuario-form]`).value;
    let contraseniaForm = d.querySelector(`[contrasenia-form]`).value;
    let fechaNacimientoForm = d.querySelector(`[fecha-form]`).value;
    let emailForm = d.querySelector(`[email-form]`).value;
    datosDesdeLS.usuarios.forEach((usuario) => {
      if (usuario.estado) {
        usuario.usuario = usuarioForm;
        usuario.contraseña = contraseniaForm;
        usuario.nacimiento = fechaNacimientoForm;
        usuario.email = emailForm
      }
  })};

  datosDesdeLS.usuarios.forEach((e) => {
    if (e.estado) {
      d.querySelector(`[usuario-form]`).value = e.usuario
      d.querySelector(`[contrasenia-form]`).value = e.contraseña
      d.querySelector(`[repetir-form]`).value = e.contraseña
      d.querySelector(`[fecha-form]`).value = e.nacimiento
      d.querySelector(`[email-form]`).value = e.email
    }
  });
  
  // Evento cerrar modal 
  
  d.getElementById("cerrarModal").addEventListener("click",function(){
    modal.style.display = "none";
  });
  
  //Redirigir a la página de inicio 
  d.getElementById("irHome").addEventListener("click", function(){
  window.localtion.href= "index.html";
});



