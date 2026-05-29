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

  materias.push({
    nombre: nombre,
    nota: nota,
    creditos: creditos
  });

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

function calcularFinal() {
  const nota1 = parseFloat(document.getElementById("nota1").value);
  const porcentaje1 = parseFloat(document.getElementById("porcentaje1").value);

  const nota2 = parseFloat(document.getElementById("nota2").value);
  const porcentaje2 = parseFloat(document.getElementById("porcentaje2").value);

  const porcentajeFinal = parseFloat(document.getElementById("porcentajeFinal").value);
  const notaObjetivo = parseFloat(document.getElementById("notaObjetivo").value);

  const resultado = document.getElementById("resultadoFinal");

  if (
    isNaN(nota1) ||
    isNaN(porcentaje1) ||
    isNaN(nota2) ||
    isNaN(porcentaje2) ||
    isNaN(porcentajeFinal) ||
    isNaN(notaObjetivo)
  ) {
    alert("Completa todos los campos del cálculo del final.");
    return;
  }

  if (
    nota1 < 0 || nota1 > 5 ||
    nota2 < 0 || nota2 > 5 ||
    notaObjetivo < 0 || notaObjetivo > 5
  ) {
    alert("Las notas deben estar entre 0.0 y 5.0.");
    return;
  }

  if (
    porcentaje1 < 0 ||
    porcentaje2 < 0 ||
    porcentajeFinal <= 0
  ) {
    alert("Los porcentajes deben ser válidos. El porcentaje del final debe ser mayor a 0.");
    return;
  }

  const sumaPorcentajes = porcentaje1 + porcentaje2 + porcentajeFinal;

  if (sumaPorcentajes !== 100) {
    alert("La suma de los porcentajes debe ser exactamente 100%.");
    return;
  }

  const acumulado = (nota1 * porcentaje1 / 100) + (nota2 * porcentaje2 / 100);
  const notaNecesaria = (notaObjetivo - acumulado) / (porcentajeFinal / 100);

  resultado.style.display = "block";

  if (notaNecesaria <= 0) {
    resultado.innerHTML = `
      🎉 Ya alcanzaste la nota objetivo.<br>
      Incluso sacando 0.0 en el final, lograrías la meta.
    `;
  } else if (notaNecesaria > 5) {
    resultado.innerHTML = `
      😢 Necesitarías sacar <strong>${notaNecesaria.toFixed(2)}</strong> en el final.<br>
      Esa nota no es posible porque supera 5.0.
    `;
  } else {
    resultado.innerHTML = `
      📚 Necesitas sacar <strong>${notaNecesaria.toFixed(2)}</strong> en el final para llegar a ${notaObjetivo.toFixed(2)}.
    `;
  }
}
