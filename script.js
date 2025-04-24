/*
Funcionalidades:
1.
Agregar tareas:
•
Al hacer clic en "Agregar", el texto escrito debe aparecer como un nuevo elemento en la lista.
•
Si el campo está vacío, no debe agregarse nada, debería aparecer un mensaje que indique que debe escribir una tarea.
2.
Eliminar tareas:
•
Cada tarea en la lista debe tener un botón "Eliminar" que la borre al hacer clic.
3.
Marcar como completada:
•
Al hacer clic en una tarea (no en el botón de eliminar), esta debe tacharse y cambiar su estilo visual.
•
Si se vuelve a hacer clic, la tarea debe volver a su estado normal.



*/
// enlazado  correctamente
// window.onload = () =>{
//     alert("hola")
// }

// Obtener referencias del DOM
const nuevoelemento = document.getElementById("listaTareas");
const agregarBoton = document.getElementById("agregarBtn");
const eliminarBoton = document.getElementById("eliminarBtn");

// Agregar tarea
agregarBoton.addEventListener("click", () => {
  const tareaInput = document.getElementById("tareaInput");
  const tarea = tareaInput.value.trim();

  if (tarea) {
    const agreItem = document.createElement("li");
    agreItem.textContent = tarea;

    // Marcar como completada 
    agreItem.addEventListener("click", () => {
      agreItem.classList.toggle("completada"); // me adiciona una clase y por medio de click tacha la lista con id agreItem
    });

    nuevoelemento.appendChild(agreItem);
    tareaInput.value = "";
  } else {
    alert("Por favor, ingrese una tarea.");
  }
});

// Eliminar ultima lista
eliminarBoton.addEventListener("click", () => {
  if (nuevoelemento.lastChild) {
    nuevoelemento.removeChild(nuevoelemento.lastChild);
  } else {
    alert("No hay tareas para eliminar.");
  }
});