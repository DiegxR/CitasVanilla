const formulario = document.querySelector("form");
const listarCita = document.getElementById("listarCita");
const buscar = document.getElementById("btnBuscar");
const busqueda = document.getElementById("busqueda");
const textbusqueda = document.getElementById("inputBuscar");
const btnreset = document.getElementById("Reset");
const SecForm = document.getElementById("SecForm");
const btnEdit = document.getElementById("btnEdit");
const btnguardar = document.getElementById("btnGuardar");
let nombre = document.getElementById("nombre");
let fecha = document.getElementById("fecha");
let hora = document.getElementById("hora");
let sintomas = document.getElementById("sintomas");
const title = document.getElementById('title');
const tabla = document.getElementById('table')

//Obtener informacion del local storage

const getLocalStorage = () => {
  const citica = JSON.parse(localStorage.getItem("citasStorage")) || [];
  return citica;
};

//invocacion de la funcion
const citas = getLocalStorage();
console.log(citas);

//funcion de pintado
const rendercitasm = (arreglo) => {
  listarCita.innerHTML = "";

  if (arreglo.length === 0) {
    listarCita.innerHTML += `<tr><td>No hay citas encontradas</td></tr>`;
  } else {
    arreglo.forEach((cita, index) => {
      const { nombre, fecha, hora, sintomas } = cita;
      listarCita.innerHTML += `
      <tr>
      <td>${nombre}</td>
      <td>${fecha}</td>
      <td>${hora}</td>
      <td>${sintomas}</td>
      <td><button class="edit" id="${index}">✏️ Editar</button> <button class="delete" id="${index}">❎ Eliminar</button></td>
      </tr>
      `;
    });
    // console.log("LO tengo");
  }
};

//invocacion de la funcion pintado
rendercitasm(citas);

const funcionbusqueda = () => {
  SecForm.classList.add("hidden");
  let citabusqueda = textbusqueda.value;
  console.log(citabusqueda);
  let filtro = citas.filter(
    (cita) => cita.nombre.toLowerCase() === citabusqueda.toLowerCase()
  );
  busqueda.innerHTML = "";

  if (filtro.length === 0) {
    busqueda.innerHTML = "<h2>El paciente especificado no existe</h2>";
    rendercitasm(filtro);
  } else {
    console.log("NO lo tengo");
    listarCita.innerHTML = "";
    rendercitasm(filtro);
  }
};

//funcion de busqueda
buscar.addEventListener("click", funcionbusqueda);
//funcion editar 
const handleEdit = (e) => {
  btnEdit.classList.remove("hidden");
  btnguardar.classList.add("hidden");
  tabla.classList.add('hidden')
  title.classList.add('hidden');
  const idcita = e.path[0].id;
  console.log(idcita)
  nombre.value = citas[idcita].nombre;
  fecha.value = citas[idcita].fecha;
  hora.value = citas[idcita].hora;
  sintomas.value = citas[idcita].sintomas;
  
  btnEdit.addEventListener('click', ()=>{
    const idcita = e.path[0].id;
    console.log(idcita)
    let editCita = {
      nombre: nombre.value,
      fecha: fecha.value, 
      hora: hora.value, 
      sintomas: sintomas.value 
  }
  console.log(editCita)
  
    citas.splice(idcita, 1, editCita);
    rendercitasm(citas);
    localStorage.setItem("citasStorage", JSON.stringify(citas));
    formulario.reset();
    btnEdit.classList.add("hidden");
    btnguardar.classList.remove("hidden");
    tabla.classList.remove('hidden');
    title.classList.remove('hidden');
  })
};
//funcion de guardado
formulario.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log(e.submitter.id)
  e.submitter.id == "btnGuardar" ?  capturarDatos() : null;
});

//funcion de reset
btnreset.addEventListener("click", () => {
  SecForm.classList.remove("hidden");
  textbusqueda.value = "";
  rendercitasm(citas);
});

//funcion para llamar la funcion apara editar o para eliminar

const handleDelete = (e) => {
  let idcita = e.path[0].id;

  confirm(
    "esta seguro de que desea eliminar la cita para el usuario " +
      citas[idcita].nombre
  )
    ? citas.splice(idcita, 1)
    : null;
  localStorage.setItem("citasStorage", JSON.stringify(citas));
  rendercitasm(citas);
};



// Escuchar los elementos de la tabla
listarCita.addEventListener("click", (e) => {
  e.path[0].className == "delete"
    ? handleDelete(e)
    : e.path[0].className == "edit"
    ? handleEdit(e)
    : null;
});

const capturarDatos = () => {
  const registro = {
    nombre: nombre.value,
    fecha: fecha.value,
    hora: hora.value,
    sintomas: sintomas.value,
  };
  citas.unshift(registro);

  localStorage.setItem("citasStorage", JSON.stringify(citas));
  formulario.reset();

  rendercitasm(citas);
};
