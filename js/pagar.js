const d = document;
const $nombreUsuario = d.querySelector(`[data-nombre-usuario]`);
const $cerrarSesion = d.querySelector(`[data-cerrar-sesion]`);

d.addEventListener("DOMContentLoaded", (e) => {
  const datosDesdeLS = JSON.parse(localStorage.getItem("datos"));

  console.log(datosDesdeLS);

  const $cerrarSesionMobile = d.querySelector(
  `[data-cerrar-sesion-mobile]`
);
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

let URLActual = window.location.search;
let pathActual = window.location.pathname;
let URLPartida = URLActual.split("=");
const NOMBRE_PLAN = URLPartida[1].toUpperCase();

const TITULO = document.querySelector(".plan-elegido").innerHTML="Ha elegido el PLAN " + NOMBRE_PLAN;

if(NOMBRE_PLAN == "MENSUAL"){
    document.querySelector(".img").innerHTML = "<img src=\"../../assets/img/PlanMensual.jpg\">";
    document.querySelector(".precio").innerHTML = "Total: $900";
    
} else if (NOMBRE_PLAN == "ANUAL"){
    document.querySelector(".img").innerHTML = "<img src=\"../../assets/img/PlanAnual.jpg\">";
    document.querySelector(".precio").innerHTML = "Total: $9000";
    
} else if (NOMBRE_PLAN == "INFINITO"){
    document.querySelector(".img").innerHTML = "<img src=\"../../assets/img/PlanInfinito.jpg\">";
    document.querySelector(".precio").innerHTML = "Total: $15000";
    
}


const BTN_PAGAR = document.querySelector(".btnPagar");
const DIALOG = document.querySelector(".modal");
const BTN_MODAL = document.querySelector(".btnModal");

BTN_MODAL.addEventListener("click", (e) => {
        DIALOG.close();    
        document.querySelector(".cajota").submit();    
    })        

BTN_PAGAR.addEventListener("click", (e) => {
    
    let nroTarjeta = document.querySelector("#Tarjeta").value;
    let cod = document.querySelector("#CVC").value; 
    let vto = document.querySelector("#VTO").value;
    let nombre = document.querySelector("#NombreYApellido").value;
    let hasError = false;
    document.querySelector(".alertaTarjeta").innerHTML = ""
    document.querySelector(".alertaCod").innerHTML = ""
    document.querySelector(".alertaVTO").innerHTML = ""
    document.querySelector(".alertaNombre").innerHTML = ""
    
    if(nroTarjeta.length != 16){
        e.preventDefault();
        document.querySelector(".alertaTarjeta").innerHTML = "Número de tarjeta inválido"
        hasError = true;

    } 
    if (cod.length != 3 || cod == '000' || cod == '999'){
        e.preventDefault();
        document.querySelector(".alertaCod").innerHTML = "Código de seguridad inválido"
        hasError = true;

    }   
    if (vto.length == 0){
        e.preventDefault();
        document.querySelector(".alertaVTO").innerHTML = "Fecha de vencimiento inválida"
        hasError = true;

    }
    if (nombre.length == 0){
        e.preventDefault();
        document.querySelector(".alertaNombre").innerHTML = "Nombre y apellido inválidos"
        hasError = true;
    }

    if(!hasError){
        e.preventDefault();
        DIALOG.showModal();
    }

    
})