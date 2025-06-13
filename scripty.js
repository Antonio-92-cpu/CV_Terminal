const promtInput = document.getElementById('promtInput');
const terminal = document.getElementById('terminal');
const terminalWindow = document.getElementById('terminalWindow');
const date = document.getElementById('date');

// Inicialización
promtInput.focus();
date.innerText = new Date().toDateString();
terminalWindow.addEventListener('click', () => promtInput.focus());

// Historial de comandos
let commandHistory = [];
let historyIndex = -1; // Controla la posición en el historial

// Función para agregar comando al historial
const addToHistory = (command) => {
  if (command.trim() === "") return;
  
  // Evitar duplicados consecutivos
  if (commandHistory.length === 0 || commandHistory[commandHistory.length - 1] !== command) {
    commandHistory.push(command);
    if (commandHistory.length > 50) {
      commandHistory.shift(); // Elimina el más antiguo si hay más de 50
    }
  }
  historyIndex = -1; // Reinicia el índice del historial
};

// Event listener principal para el input
promtInput.addEventListener('keydown', (event) => {
  if (event.key === "Enter") {
    enterCommand(event);
  } else if (event.key === "ArrowUp") {
    // Navegar hacia atrás en el historial
    event.preventDefault();
    if (commandHistory.length > 0 && historyIndex < commandHistory.length - 1) {
      historyIndex++;
      promtInput.value = commandHistory[commandHistory.length - 1 - historyIndex];
    }
  } else if (event.key === "ArrowDown") {
    // Navegar hacia adelante en el historial
    event.preventDefault();
    if (historyIndex > 0) {
      historyIndex--;
      promtInput.value = commandHistory[commandHistory.length - 1 - historyIndex];
    } else if (historyIndex === 0) {
      historyIndex--;
      promtInput.value = "";
    }
  }
});

// Función para procesar comando ingresado
const enterCommand = (event) => {
  const command = event.target.value;
  addToHistory(command);
  
  const promtElement = document.getElementById('promptClone').cloneNode(true);
  promtElement.classList.remove('hidden');
  promtElement.getElementsByClassName('promtCloneInput')[0].innerHTML = command;
  promtElement.setAttribute('id', null);
  promtElement.getElementsByClassName('promtCloneContent')[0].appendChild(selectCommandBlock(command));
  terminal.appendChild(promtElement);
  
  promtInput.value = '';
  promtInput.scrollIntoView({block: 'start'});
};

// Función para seleccionar el bloque de comando apropiado
const selectCommandBlock = (command) => {
  const lowerCommand = command.toLowerCase().trim();
  
  // Comando especial whoami con mensaje personalizado
  if (lowerCommand === "whoami") {
    const div = document.createElement("div");
    div.innerText = "Eres un usuario curioso explorando esta terminal web 🚀";
    return div;
  }

  // Switch para otros comandos
  switch (lowerCommand) {
    case 'help':
    case 'about':
    case 'social':
    case 'skills':
    case 'education':
    case 'experience':
    case 'projects':
      return getCommandTemplate(lowerCommand);
    case 'clear':
      return clearCommand();
    case 'history':
      return showHistory();
    default:
      return notFoundCommand(command);
  }
};

// Función para obtener template de comando
const getCommandTemplate = (command) => {
  const element = document.getElementById(command);
  if (element) {
    const clonedElement = element.cloneNode(true);
    clonedElement.classList.remove('hidden');
    clonedElement.setAttribute('id', null);
    return clonedElement;
  } else {
    return notFoundCommand(command);
  }
};

// Función para limpiar terminal
const clearCommand = () => {
  terminal.innerHTML = '';
  const element = document.createElement('span');
  return element;
};

// Función para mostrar historial de comandos
const showHistory = () => {
  const div = document.createElement('div');
  if (commandHistory.length === 0) {
    div.innerText = "No hay comandos en el historial";
  } else {
    div.innerHTML = commandHistory.map((cmd, index) => 
      `${index + 1}: ${cmd}`
    ).join('<br>');
  }
  return div;
};

// Función para comando no encontrado
const notFoundCommand = (command) => {
  const element = document.createElement('span');
  element.innerText = `-bash: ${command}: command not found`;
  element.classList.add('error');
  return element;
};