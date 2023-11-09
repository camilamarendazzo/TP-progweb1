const d = document;
const datosDesdeLS = JSON.parse(localStorage.getItem("datos"));
const $nombreUsuario = d.querySelector(`[data-nombre-usuario]`);
const $cerrarSesion = d.querySelector(`[data-cerrar-sesion]`);
const $cerrarSesionMobile = d.querySelector(`[data-cerrar-sesion-mobile]`);

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

      datosDesdeLS.usuarios.forEach((e) => {
        if (e.estado) {
          e.estado = false;
        }
      });

      localStorage.setItem("datos", JSON.stringify(datosDesdeLS));
      location.href = "../../index.html";
    }
  });
  
  function eliminarUsuario (){
  localStorage.removeItem("datos");
  alert("Usuario elminado del Local Storage");
  }

  d.getElementById("eliminarUsuario").addEventListener("click",eliminarUsuario);

});

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



