// Obtén referencias a los elementos del DOM
const inputText = document.getElementById('input-text');
const outputText = document.getElementById('output-text');
const encryptBtn = document.getElementById('encrypt-btn');
const decryptBtn = document.getElementById('decrypt-btn');
const copyBtn = document.getElementById('copy-btn');
const outputContainer = document.querySelector('.output-container');
const historyContainer = document.querySelector('.history-container');
const errorMessage = document.getElementById('error-message');

// Reglas de encriptación
const encryptionRules = {
    'e': 'enter',
    'i': 'imes',
    'a': 'ai',
    'o': 'ober',
    'u': 'ufat'
};

// Variable para almacenar el historial
let historyList;

// Función para encriptar el texto
function encrypt() {
    const text = inputText.value.toLowerCase();

    // Validación de la entrada (solo letras minúsculas sin acento)
    if (!isValidInput(text)) {
        showError("¡Solo se permiten letras minúsculas y sin acento!");
        return;
    }

    // Encripta el texto usando las reglas
    const encryptedText = Array.from(text)
        .map(char => encryptionRules[char] || char)
        .join('');

    // Muestra el texto encriptado
    outputText.value = encryptedText;
    outputContainer.classList.remove('hidden');

    // Agrega al historial
    addToHistory(text, encryptedText);

    // Limpia cualquier mensaje de error previo
    clearError();
}

// Función para desencriptar el texto
function decrypt() {
    let text = outputText.value;

    // Intenta desencriptar el texto
    const originalText = decryptText(text);

    // Muestra el texto original o el texto original si no se pudo desencriptar
    outputText.value = originalText || text;

    // Agrega al historial (incluso si no se pudo desencriptar)
    addToHistory(originalText || text, outputText.value);

    // Limpia cualquier mensaje de error previo
    clearError();
}

// Función auxiliar para desencriptar
function decryptText(text) {
    // Reemplaza las secuencias encriptadas por las letras originales
    for (const original in encryptionRules) {
        const encrypted = encryptionRules[original];
        text = text.replaceAll(encrypted, original);
    }

    // Valida que el texto resultante sea válido (solo letras minúsculas sin acento)
    if (!isValidInput(text)) {
        return null; // Indica que no se pudo desencriptar
    }

    return text;
}

// Función para copiar el texto al portapapeles
function copy() {
  outputText.select();
  navigator.clipboard.writeText(outputText.value)
    .then(() => {
      showCopyMessage(); // Muestra el mensaje emergente al copiar exitosamente
    })
    .catch(err => {
      console.error('Error al copiar al portapapeles:', err);
      // Puedes mostrar un mensaje de error aquí si lo deseas
    });
}

// Función para mostrar el mensaje emergente con animación
function showCopyMessage() {
  const message = document.createElement('div');
  message.textContent = '¡Copiado!';
  message.classList.add('copy-message'); 

  document.body.appendChild(message);

  setTimeout(() => {
    message.classList.add('show');
  }, 10); 

  setTimeout(() => {
    message.classList.remove('show');
    setTimeout(() => {
      message.remove();
    }, 300); 
  }, 2000); 
}

// Función para agregar al historial
function addToHistory(original, encrypted) {
    // Crea la lista del historial si no existe
    if (!historyList) {
        const title = document.createElement('h2');
        title.textContent = 'Historial';

        historyList = document.createElement('ul');
        historyList.id = 'history-list';

        historyContainer.appendChild(title);
        historyContainer.appendChild(historyList);
    }

    // Crea un elemento de lista para el historial
    const listItem = document.createElement('li');
    listItem.textContent = `${original} -> ${encrypted}`;

    // Agrega un evento para que al hacer clic se llene el formulario con los valores del historial
    listItem.addEventListener('click', () => {
        inputText.value = original;
        outputText.value = encrypted;
        outputContainer.classList.remove('hidden');
    });

    // Agrega el elemento a la lista
    historyList.appendChild(listItem);

    // Muestra el contenedor del historial
    historyContainer.classList.remove('hidden');
}

// Función para mostrar un mensaje de error
function showError(message) {
    errorMessage.textContent = message;
    errorMessage.classList.remove('hidden');
}

// Función para limpiar el mensaje de error
function clearError() {
    errorMessage.textContent = '';
    errorMessage.classList.add('hidden');
}

// Función para validar la entrada
function isValidInput(text) {
    return /^[a-z ]*$/.test(text);
}

// Agrega los eventos a los botones
encryptBtn.addEventListener('click', encrypt);
decryptBtn.addEventListener('click', decrypt);
copyBtn.addEventListener('click', copy); 1