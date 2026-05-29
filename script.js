let materias = [];
let actividades = [];

function mostrarPantalla(pantalla) {
  document.getElementById("pantallaFinal").classList.remove("active");
  document.getElementById("pantallaPromedio").classList.remove("active");

  const botones = document.querySelectorAll(".nav-btn");
  botones.forEach(boton => boton.classList.remove("active"));

  if (pantalla === "final") {
    document.getElementById("pantallaFinal").classList.add("active");
    botones[0].classList.add("active");
  }

  if (pantalla === "promedio") {
    document.getElementById("pantallaPromedio").classList.add("active");
    botones[1].classList.add("active");
  }
}

function agregarActividad() {
  const nombre = document.getElementById("nombreActividad").value.trim();
  const nota = parseFloat(document.getElementById("notaActividad").value);
  const porcentaje = parseFloat(document.getElementById("porcentajeActividad").value);

  if (nombre === "" || isNaN(nota) || isNaN(porcentaje)) {
    alert("Completa todos los campos de la actividad.");
    return;
  }

  if (nota < 0 || nota > 5) {
    alert("La nota debe estar entre 0.0 y 5.0.");
    return;
  }

  if (porcentaje <= 0 || porcentaje > 100) {
    alert("El porcentaje debe estar entre 1 y 100.");
    return;
  }

  const sumaActual = actividades.reduce((total, act) => total + act.porcentaje, 0);

  if (sumaActual + porcentaje > 100) {
    alert("La suma de porcentajes no puede superar el 100%.");
    return;
  }

  actividades.push({ nombre, nota, porcentaje });

  document.getElementById("nombreActividad").value = "";
  document.getElementById("notaActividad").value = "";
  document.getElementById("porcentajeActividad").value = "";

  mostrarActividades();
}

function mostrarActividades() {
  const tabla = document.getElementById("tablaActividades");
  tabla.innerHTML = "";

  actividades.forEach((actividad, index) => {
    tabla.innerHTML += `
      <tr>
        <td>${actividad.nombre}</td>
        <td>${actividad.nota.toFixed(2)}</td>
        <td>${actividad.porcentaje}%</td>
        <td><button class="delete-btn" onclick="eliminarActividad(${index})">🗑</button></td>
      </tr>
    `;
  });
}

function eliminarActividad(index) {
  actividades.splice(index, 1);
  mostrarActividades();
  reiniciarResultadoFinal();
}

function limpiarActividades() {
  actividades = [];
  mostrarActividades();
  reiniciarResultadoFinal();
}

function reiniciarResultadoFinal() {
  document.querySelector("#resultadoFinal strong").textContent = "--";
  document.querySelector("#resultadoFinal p").textContent = "Nota que necesitas:";
}

function calcularNotaFinal() {
  const porcentajeFinal = parseFloat(document.getElementById("porcentajeFinal").value);
  const notaObjetivo = parseFloat(document.getElementById("notaObjetivo").value);

  if (actividades.length === 0) {
    alert("Agrega al menos una actividad.");
    return;
  }

  if (isNaN(porcentajeFinal) || isNaN(notaObjetivo)) {
    alert("Completa la nota objetivo y el porcentaje restante.");
    return;
  }

  if (notaObjetivo < 0 || notaObjetivo > 5) {
    alert("La nota objetivo debe estar entre 0.0 y 5.0.");
    return;
  }

  const porcentajeActividades = actividades.reduce((total, act) => total + act.porcentaje, 0);
  const porcentajeTotal = porcentajeActividades + porcentajeFinal;

  if (porcentajeTotal !== 100) {
    alert(`La suma debe ser 100%. Actualmente suma ${porcentajeTotal}%.`);
    return;
  }

  const acumulado = actividades.reduce((total, act) => {
    return total + (act.nota * act.porcentaje / 100);
  }, 0);

  const notaNecesaria = (notaObjetivo - acumulado) / (porcentajeFinal / 100);

  const resultadoTexto = document.querySelector("#resultadoFinal strong");
  const resultadoDescripcion = document.querySelector("#resultadoFinal p");

  if (notaNecesaria <= 0) {
    resultadoTexto.textContent = "0.00";
    resultadoDescripcion.textContent = "Ya alcanzaste tu meta.";
  } else if (notaNecesaria > 5) {
    resultadoTexto.textContent = notaNecesaria.toFixed(2);
    resultadoDescripcion.textContent = "No es posible llegar a esa nota.";
  } else {
    resultadoTexto.textContent = notaNecesaria.toFixed(2);
    resultadoDescripcion.textContent = "Nota que necesitas:";
  }
}

function agregarMateria() {
  const nombre = document.getElementById("materia").value.trim();
  const nota = parseFloat(document.getElementById("nota").value);
  const creditos = parseInt(document.getElementById("creditos").value);

  if (nombre === "" || isNaN(nota) || isNaN(creditos)) {
    alert("Completa todos los campos.");
    return;
  }

  if (nota < 0 || nota > 5) {
    alert("La nota debe estar entre 0.0 y 5.0.");
    return;
  }

  if (creditos <= 0) {
    alert("Los créditos deben ser mayores a 0.");
    return;
  }

  materias.push({ nombre, nota, creditos });

  document.getElementById("materia").value = "";
  document.getElementById("nota").value = "";
  document.getElementById("creditos").value = "";

  mostrarMaterias();
  calcularPromedio();
}

function mostrarMaterias() {
  const tabla = document.getElementById("tablaMaterias");
  tabla.innerHTML = "";

  materias.forEach((materia, index) => {
    tabla.innerHTML += `
      <tr>
        <td>${materia.nombre}</td>
        <td>${materia.nota.toFixed(2)}</td>
        <td>${materia.creditos}</td>
        <td><button class="delete-btn" onclick="eliminarMateria(${index})">🗑</button></td>
      </tr>
    `;
  });
}

function calcularPromedio() {
  let sumaNotasPorCreditos = 0;
  let sumaCreditos = 0;

  materias.forEach(materia => {
    sumaNotasPorCreditos += materia.nota * materia.creditos;
    sumaCreditos += materia.creditos;
  });

  const promedio = sumaCreditos === 0 ? 0 : sumaNotasPorCreditos / sumaCreditos;

  document.getElementById("promedio").textContent = promedio.toFixed(2);

  const estado = document.getElementById("estado");

  if (materias.length === 0) {
    estado.textContent = "";
  } else if (promedio >= 3.0) {
    estado.textContent = "Vas ganando el semestre.";
  } else {
    estado.textContent = "Debes subir el promedio.";
  }
}

function eliminarMateria(index) {
  materias.splice(index, 1);
  mostrarMaterias();
  calcularPromedio();
}

function limpiarMaterias() {
  materias = [];
  mostrarMaterias();
  calcularPromedio();
}
