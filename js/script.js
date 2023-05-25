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
  }
  
  // Crear una instancia de ListaEnlazada
  const listaTareas = new ListaEnlazada();
  
  // Obtener elementos del DOM
  const taskInput = document.getElementById('taskInput');
  const taskList = document.getElementById('taskList');
  const sortButton = document.getElementById('sortButton');
  
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
  
  // Renderizar la lista de tareas en la página
  function renderizarLista() {
    taskList.innerHTML = '';
  
    const lista = listaTareas.obtenerLista();
    lista.forEach(tarea => {
      const li = document.createElement('li');
      li.textContent = tarea;
      taskList.appendChild(li);
    });
  }
  
  // Evento clic del botón "Agregar"
  document.getElementById('addButton').addEventListener('click', agregarTarea);
  
  // Evento clic del botón "Ordenar"
  sortButton.addEventListener('click', ordenarLista);
  
  // Llamar a la función de renderizado inicial
  renderizarLista();
  