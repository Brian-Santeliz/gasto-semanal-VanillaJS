//Variables
const presupuestoUsuario = prompt("Ingresa tu presupuesto semanal:");
const presupuestoSpan = document.querySelector("#total");
const restanteSpan = document.querySelector("#restante");
const formMessageContainer = document.querySelector(".primario");
const submitForm = document.getElementById("agregar-gasto");
const inputGasto = document.getElementById("gasto");
const cantidadGasto = document.getElementById("cantidad");
const gastoUl = document.querySelector("ul");
const restanteDiv = document.querySelector(".restante");
//varible global para accder al presupuesto y restante

//EventListeners
document.addEventListener("DOMContentLoaded", function () {
  if (presupuestoUsuario === null || presupuestoUsuario === "") {
    window.location.reload();
  } else {
    //instaciar presupuesto

    cantidadPresupuesto = new Presupuesto(presupuestoUsuario);
    //instancear la clase de interfaz
    const interfaz = new Interfaz();
    interfaz.insertarPresupuesto(cantidadPresupuesto);
  }
});

submitForm.addEventListener("submit", function (e) {
  e.preventDefault();

  //instanciando la insterfazt
  const ui = new Interfaz();
  //comprobando que los campos no esten vacios
  if (inputGasto.value.trim() === "" || cantidadGasto.value.trim() === "") {
    //mostrar en la interfaz error
    ui.imprimirMensaje("Ingresa todos los campos", "error");
  } else {
    ui.agregarListado(inputGasto.value, cantidadGasto.value);
    ui.imprimirMensaje("Agregado Correctamente", "correcto");
    ui.presupuestoRestanteListado(cantidadGasto.value);
  }
});

//Clases para restar el presupuesto
class Presupuesto {
  constructor(presupuesto) {
    this.presupuesto = Number(presupuesto);
    this.restante = Number(presupuesto);
  }
  //Método para restar el presupuesto actual
  presupuestoRestante(cantidad = 0) {
    return (this.restante -= Number(cantidad));
  }
}

//maneja todo el HTML
class Interfaz {
  insertarPresupuesto(cantidad) {
    //insertando la cantidad al html
    presupuestoSpan.textContent = `${cantidad.presupuesto}`;
    restanteSpan.textContent = `${cantidad.presupuesto}`;
  }
  imprimirMensaje(mensaje, tipo) {
    const div = document.createElement("div");
    div.classList.add("text-center", "alert");
    if (tipo === "error") {
      div.classList.add("alert-danger");
    } else {
      div.classList.add("alert-success");
    }
    //agregando el mensaje al div
    div.innerHTML = `${mensaje}`;
    //insertando el div en el form
    formMessageContainer.insertBefore(div, submitForm);
    //quita el alert despues de 3s
    setTimeout(() => {
      div.style.display = "none";
      submitForm.reset();
    }, 2000);
  }
  //insertando los gastos en la lista
  agregarListado(nombre, gasto) {
    //creando li
    const li = document.createElement("li");
    li.classList.add(
      "list-group-item",
      "d-flex",
      "justify-content-between",
      "align-items-center"
    );
    //insertando el gasto
    li.innerHTML = `
        ${nombre}
        <span class="badge badge-warning badge-pill" style="color:white !important;">$${gasto}</span>
     `;

    //insertando el gasto
    gastoUl.appendChild(li);
  }
  //imprime el presupuesto restante en el html
  presupuestoRestanteListado(cantidadGastar) {
    //leemos el presupuesto restante
    const presupuestoRestadoListado = cantidadPresupuesto.presupuestoRestante(
      cantidadGastar
    );
    //imprimie en el html el restante
    restanteSpan.innerHTML = `${presupuestoRestadoListado}`;
    //ejecutamos la funcion de cambiar color despues de restar el presupuesto
    this.cambiarColorAlerta();
  }
  //cambia el color de la alerta dinamicamente dependiendo del restante
  cambiarColorAlerta() {
    //accediendo al presupuesto y restante del objeto cantidadPresupuesto
    const presupuestoTotal = cantidadPresupuesto.presupuesto;
    const restante = cantidadPresupuesto.restante;
    //comprobar el 25% del presupuesto
    if (presupuestoTotal / 4 > restante) {
      restanteDiv.classList.remove("alert-success", "alert-warning"); //agregando las clases
      restanteDiv.classList.add("alert-danger");
      //comprueba el 50%
    } else if (presupuestoTotal / 2 > restante) {
      restanteDiv.classList.remove("alert-success");
      restanteDiv.classList.add("alert-warning");
    }
  }
}
