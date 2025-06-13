const promtInput = document.getElementById('promtInput');
const terminal = document.getElementById('terminal');
const terminalWindow = document.getElementById('terminalWindow');
const date = document.getElementById('date');

promtInput.focus();
date.innerText = new Date().toDateString()
terminalWindow.addEventListener('click', () => promtInput.focus());



let commandHistory = [];

const addToHistory = (command) => {
  commandHistory.push(command);
  if (commandHistory.length > 40) {
    commandHistory.shift(); // Elimina el más antiguo si hay más de 40
  }
};

promtInput.addEventListener('keydown', (event) => {
  if (event.key === "Enter") {
    enterCommand(event);
  }
})

const enterCommand = (event) => {
  addToHistory(event.target.value);
  const promtElement = document.getElementById('promptClone').cloneNode(true);
  promtElement.classList.remove('hidden');
  promtElement.getElementsByClassName('promtCloneInput')[0].innerHTML = event.target.value;
  promtElement.setAttribute('id', null);
  promtElement.getElementsByClassName('promtCloneContent')[0].appendChild(selectCommandBlock(event.target.value));
  terminal.appendChild(promtElement);
  promtInput.value = '';
  promtInput.scrollIntoView({block: 'start'});
}


const selectCommandBlock = (command) => {

  if (command === "whoami") {
    const div = document.createElement("div");
    div.innerText = "Eres un usuario curioso explorando esta terminal web 🚀";
    return div;
  }

  const lowerCommand = command.toLowerCase()
  switch (lowerCommand) {
    case 'help':
    case 'about':
    case 'social':
    case 'whoami':
    case 'skills':
    case 'education':
    case 'experience':
    case 'projects':
      return getCommandTemplate(lowerCommand);
    case 'clear':
      return clearCommand();
    default:
      return notFoundCommand(command);
  }
}

const getCommandTemplate = (command) => {
  const element = document.getElementById(command).cloneNode(true);
  element.classList.remove('hidden');
  element.setAttribute('id', null);
  return element;
}

const clearCommand = () => {
  terminal.innerHTML = '';
  const element = document.createElement('span');
  return element;
}

const notFoundCommand = (command) => {
  const element = document.createElement('span');
  element.innerText = `-bash: ${command}: command not found`;
  element.classList.add('error');
  return element;
}