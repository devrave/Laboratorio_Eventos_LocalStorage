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

 // Obtener referencias de los elementos del DOM
 const listaTareas = document.getElementById("listaTareas");
 const agregarBtn = document.getElementById("agregarBtn");
 const eliminarBtn = document.getElementById("eliminarBtn");
 const borrarTodoBtn = document.getElementById("borrarTodoBtn");
 const tareaInput = document.getElementById("tareaInput");

 // Función para obtener las tareas desde localStorage
 function obtenerTareas() {
   const tareasGuardadas = localStorage.getItem("tareas");
   if (tareasGuardadas) {
     return JSON.parse(tareasGuardadas);
   } else {
     return [];
   }
 }

 // Función para guardar las tareas en localStorage
 function guardarTareas(tareas) {
   localStorage.setItem("tareas", JSON.stringify(tareas));
 }

 // Función para mostrar las tareas en la lista
 function mostrarTareas() {
   // Limpiar la lista antes de volver a mostrar
   listaTareas.innerHTML = "";

   // Obtener las tareas almacenadas
   const tareas = obtenerTareas();

   // Recorrer todas las tareas y mostrarlas
   for (let i = 0; i < tareas.length; i++) {
     const tarea = tareas[i];
     const li = document.createElement("li");
     li.textContent = tarea.texto;

     // Si la tarea está completada, agregar la clase
     if (tarea.completada === true) {
       li.classList.add("completada");
     }

     // Evento para marcar/desmarcar como completada
     li.addEventListener("click", function() {
       if (tareas[i].completada === true) {
         tareas[i].completada = false;
       } else {
         tareas[i].completada = true;
       }
       guardarTareas(tareas);
       mostrarTareas();
     });

     listaTareas.appendChild(li);
   }
 }

 // Evento para agregar una nueva tarea
 agregarBtn.addEventListener("click", function() {
   const texto = tareaInput.value.trim();

   if (texto !== "") {
     const tareas = obtenerTareas();
     const nuevaTarea = {
       texto: texto,
       completada: false
     };
     tareas.push(nuevaTarea);
     guardarTareas(tareas);
     mostrarTareas();
     tareaInput.value = "";
   } else {
     alert("Por favor, ingrese una tarea.");
   }
 });

 // Evento para eliminar la última tarea
 eliminarBtn.addEventListener("click", function() {
   const tareas = obtenerTareas();
   if (tareas.length > 0) {
     tareas.pop();
     guardarTareas(tareas);
     mostrarTareas();
   } else {
     alert("No hay tareas para eliminar.");
   }
 });

 // Evento para borrar todas las tareas
 borrarTodoBtn.addEventListener("click", function() {
   const confirmacion = confirm("¿Seguro que quieres borrar todas las tareas?");
   if (confirmacion === true) {
     localStorage.removeItem("tareas");
     mostrarTareas();
   }
 });

 // Mostrar tareas al cargar la página
 mostrarTareas();