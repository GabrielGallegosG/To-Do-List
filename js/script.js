// Definir la clase Nodo para representar cada tarea
class Nodo {
  constructor(valor) {
    this.valor = valor;
    this.siguiente = null;
  }
}

// Definir la clase ListaEnlazada para gestionar la lista de tareas
class ListaEnlazada {
  constructor() {
    this.cabeza = null;
  }

  agregar(valor) {
    const nodo = new Nodo(valor);

    if (!this.cabeza) {
      this.cabeza = nodo;
    } else {
      let actual = this.cabeza;
      while (actual.siguiente) {
        actual = actual.siguiente;
      }
      actual.siguiente = nodo;
    }
  }

  eliminar(valor) {
    if (!this.cabeza) {
      return;
    }

    if (this.cabeza.valor === valor) {
      this.cabeza = this.cabeza.siguiente;
      return;
    }

    let actual = this.cabeza;
    let previo = null;

    while (actual && actual.valor !== valor) {
      previo = actual;
      actual = actual.siguiente;
    }

    if (!actual) {
      return;
    }

    previo.siguiente = actual.siguiente;
  }

  obtenerLista() {
    const lista = [];
    let actual = this.cabeza;

    while (actual) {
      lista.push(actual.valor);
      actual = actual.siguiente;
    }

    return lista;
  }

  ordenarAlfabeticamente() {
    const lista = this.obtenerLista();
    const n = lista.length;
    let intervalo = Math.floor(n / 2);

    while (intervalo > 0) {
      for (let i = intervalo; i < n; i++) {
        const temp = lista[i];
        let j = i;

        while (j >= intervalo && lista[j - intervalo].localeCompare(temp) > 0) {
          lista[j] = lista[j - intervalo];
          j -= intervalo;
        }

        lista[j] = temp;
      }

      intervalo = Math.floor(intervalo / 2);
    }

    // Actualizar los valores en la lista enlazada con la lista ordenada
    let actual = this.cabeza;
    let i = 0;

    while (actual) {
      actual.valor = lista[i];
      actual = actual.siguiente;
      i++;
    }
  }

  buscar(valor) {
    const lista = this.obtenerLista();
    let izquierda = 0;
    let derecha = lista.length - 1;

    while (izquierda <= derecha) {
      const medio = Math.floor((izquierda + derecha) / 2);
      if (lista[medio] === valor) {
        return true;
      } else if (lista[medio].localeCompare(valor) < 0) {
        izquierda = medio + 1;
      } else {
        derecha = medio - 1;
      }
    }

    return false;
  }
}

// Crear una instancia de ListaEnlazada
const listaTareas = new ListaEnlazada();

// Obtener elementos del DOM
const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');
const sortButton = document.getElementById('sortButton');
const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');

// Agregar tarea a la lista enlazada y mostrarla en la página
function agregarTarea() {
  const tarea = taskInput.value.trim();

  if (tarea !== '') {
    listaTareas.agregar(tarea);
    renderizarLista();
    taskInput.value = '';
  }
}

// Ordenar la lista alfabéticamente y mostrarla en la página
function ordenarLista() {
  listaTareas.ordenarAlfabeticamente();
  renderizarLista();
}

// Buscar tarea en la lista y resaltarla en la página
let tareaEncontrada = '';

function buscarTarea() {
  const tareaBuscada = searchInput.value.trim();

  if (tareaBuscada !== '') {
    const encontrado = listaTareas.buscar(tareaBuscada);
    tareaEncontrada = encontrado ? tareaBuscada : '';
    renderizarLista();
    searchInput.value = '';
  } else {
    tareaEncontrada = '';
    renderizarLista();
  }
}


// Renderizar la lista de tareas en la página
function renderizarLista() {
  taskList.innerHTML = '';

  const lista = listaTareas.obtenerLista();

  if (tareaEncontrada !== '') {
    const tareaEncontradaLi = document.createElement('li');
    tareaEncontradaLi.textContent = tareaEncontrada;
    tareaEncontradaLi.classList.add('encontrado');
    taskList.appendChild(tareaEncontradaLi);
  } else {
    lista.forEach(tarea => {
      const li = document.createElement('li');
      li.textContent = tarea;
      taskList.appendChild(li);
    });
  }
}


// Resaltar la tarea buscada en la página
function resaltarTarea(encontrado, tareaBuscada) {
  const tareas = taskList.getElementsByTagName('li');

  for (let i = 0; i < tareas.length; i++) {
    const tarea = tareas[i].textContent;

    if (tarea === tareaBuscada) {
      tareas[i].classList.add(encontrado ? 'encontrado' : 'no-encontrado');
    } else {
      tareas[i].classList.remove('encontrado', 'no-encontrado');
    }
  }
}

// Evento clic del botón "Agregar"
document.getElementById('addButton').addEventListener('click', agregarTarea);

// Evento clic del botón "Ordenar"
sortButton.addEventListener('click', ordenarLista);

// Evento clic del botón "Buscar"
searchButton.addEventListener('click', buscarTarea);

// Llamar a la función de renderizado inicial
renderizarLista();
