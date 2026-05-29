let materias = [];

function agregarMateria() {
  const nombre = document.getElementById("materia").value.trim();
  const nota = parseFloat(document.getElementById("nota").value);
  const creditos = parseInt(document.getElementById("creditos").value);

  if (nombre === "" || isNaN(nota) || isNaN(creditos)) {
    alert("Por favor llena todos los campos.");
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

  const materia = {
    nombre: nombre,
    nota: nota,
    creditos: creditos
  };

  materias.push(materia);

  limpiarCampos();
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
      <td>
        <button class="eliminar" onclick="eliminarMateria(${index})">Eliminar</button>
      </td>
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

function limpiarCampos() {
  document.getElementById("materia").value = "";
  document.getElementById("nota").value = "";
  document.getElementById("creditos").value = "";
}
