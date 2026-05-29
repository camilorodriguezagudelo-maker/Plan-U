let materias = [];
let actividades = [];

function mostrarPantalla(pantalla) {
  const pantallaPromedio = document.getElementById("pantallaPromedio");
  const pantallaFinal = document.getElementById("pantallaFinal");
  const tabs = document.querySelectorAll(".tab");

  pantallaPromedio.classList.remove("active-screen");
  pantallaFinal.classList.remove("active-screen");

  tabs.forEach(tab => tab.classList.remove("active"));

  if (pantalla === "promedio") {
    pantallaPromedio.classList.add("active-screen");
    tabs[0].classList.add("active");
  } else {
    pantallaFinal.classList.add("active-screen");
    tabs[1].classList.add("active");
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
    const fila = document.createElement("tr");

    fila.innerHTML = `
      <td>${materia.nombre}</td>
      <td>${materia.nota.toFixed(2)}</td>
      <td>${materia.creditos}</td>
      <td><button class="eliminar" onclick="eliminarMateria(${index})">Eliminar</button></td>
    `;

    tabla.appendChild(fila);
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
    const fila = document.createElement("tr");

    fila.innerHTML = `
      <td>${actividad.nombre}</td>
      <td>${actividad.nota.toFixed(2)}</td>
      <td>${actividad.porcentaje}%</td>
      <td><button class="eliminar" onclick="eliminarActividad(${index})">Eliminar</button></td>
    `;

    tabla.appendChild(fila);
  });
}

function eliminarActividad(index) {
  actividades.splice(index, 1);
  mostrarActividades();

  const resultado = document.getElementById("resultadoFinal");
  resultado.style.display = "none";
}

function calcularNotaFinal() {
  const porcentajeFinal = parseFloat(document.getElementById("porcentajeFinal").value);
  const notaObjetivo = parseFloat(document.getElementById("notaObjetivo").value);
  const resultado = document.getElementById("resultadoFinal");

  if (actividades.length === 0) {
    alert("Agrega al menos una actividad.");
    return;
  }

  if (isNaN(porcentajeFinal) || isNaN(notaObjetivo)) {
    alert("Completa el porcentaje del final y la nota objetivo.");
    return;
  }

  if (porcentajeFinal <= 0 || porcentajeFinal > 100) {
    alert("El porcentaje del final debe estar entre 1 y 100.");
    return;
  }

  if (notaObjetivo < 0 || notaObjetivo > 5) {
    alert("La nota objetivo debe estar entre 0.0 y 5.0.");
    return;
  }

  const porcentajeActividades = actividades.reduce((total, act) => total + act.porcentaje, 0);
  const porcentajeTotal = porcentajeActividades + porcentajeFinal;

  if (porcentajeTotal !== 100) {
    alert(`La suma de actividades y final debe ser 100%. Actualmente suma ${porcentajeTotal}%.`);
    return;
  }

  const acumulado = actividades.reduce((total, act) => {
    return total + (act.nota * act.porcentaje / 100);
  }, 0);

  const notaNecesaria = (notaObjetivo - acumulado) / (porcentajeFinal / 100);

  resultado.style.display = "block";

  if (notaNecesaria <= 0) {
    resultado.innerHTML = `
      🎉 Ya alcanzaste la nota objetivo.<br>
      Incluso con 0.0 en el final llegarías a ${notaObjetivo.toFixed(2)}.
    `;
  } else if (notaNecesaria > 5) {
    resultado.innerHTML = `
      😢 Necesitas sacar <strong>${notaNecesaria.toFixed(2)}</strong> en el final.<br>
      No es posible porque supera 5.0.
    `;
  } else {
    resultado.innerHTML = `
      📚 Necesitas sacar <strong>${notaNecesaria.toFixed(2)}</strong> en el final<br>
      para terminar la materia en ${notaObjetivo.toFixed(2)}.
    `;
  }
}
