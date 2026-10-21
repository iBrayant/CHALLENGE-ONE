// Obtén referencias a los elementos del DOM
const inputText = document.getElementById('input-text');
const outputText = document.getElementById('output-text');
const encryptBtn = document.getElementById('encrypt-btn');
const decryptBtn = document.getElementById('decrypt-btn');
const copyBtn = document.getElementById('copy-btn');
const outputContainer = document.querySelector('.output-container');
const historyContainer = document.querySelector('.history-container');
const historyList = document.getElementById('history-list');
const errorMessage = document.getElementById('error-message');

// Reglas de encriptación
const encryptionRules = {
    'e': 'enter',
    'i': 'imes',
    'a': 'ai',
    'o': 'ober',
    'u': 'ufat'
};

// Reglas inversas y patrón para desencriptar
const decryptionRules = Object.fromEntries(
    Object.entries(encryptionRules).map(([letra, codigo]) => [codigo, letra])
);
const decryptionPattern = new RegExp(Object.values(encryptionRules).join('|'), 'g');

// Letras que el cifrado no admite: mayúsculas, acentos y ñ
const invalidChars = /[A-ZÁÉÍÓÚÜÑáéíóúüñ]/;

const MAX_HISTORY = 20;

// Encripta reemplazando cada vocal por su secuencia
function encryptText(text) {
    return text.replace(/[eiaou]/g, vocal => encryptionRules[vocal]);
}

// Desencripta en UNA sola pasada. Reemplazar regla por regla encadenaba efectos:
// por ejemplo "ames" se encripta como "aimenters" y daba "a" al desencriptar.
function decryptText(text) {
    return text.replace(decryptionPattern, codigo => decryptionRules[codigo]);
}

// Lee y valida el texto de entrada; devuelve null si no es válido
function readInput() {
    const text = inputText.value;

    if (!text.trim()) {
        showError('Escribe un texto primero.');
        return null;
    }

    if (invalidChars.test(text)) {
        showError('¡Solo letras minúsculas y sin acento (sin ñ ni mayúsculas)!');
        return null;
    }

    clearError();
    return text;
}

function showOutput(text) {
    outputText.value = text;
    outputContainer.classList.remove('hidden');
}

// Encripta el texto de entrada
function encrypt() {
    const text = readInput();
    if (text === null) return;

    const result = encryptText(text);
    showOutput(result);
    addToHistory('Encriptar', text, result);
}

// Desencripta el texto de entrada
function decrypt() {
    const text = readInput();
    if (text === null) return;

    const result = decryptText(text);
    if (result === text) {
        showError('No se encontró texto encriptado en el mensaje.');
        return;
    }

    showOutput(result);
    addToHistory('Desencriptar', text, result);
}

// Copia el resultado al portapapeles
async function copy() {
    if (!outputText.value) return;

    try {
        await navigator.clipboard.writeText(outputText.value);
        showToast('¡Copiado!');
    } catch (err) {
        console.error('Error al copiar al portapapeles:', err);
        outputText.select();
        showToast('No se pudo copiar: presiona Ctrl+C', true);
    }
}

// Muestra un mensaje emergente con animación
function showToast(text, isError = false) {
    const message = document.createElement('div');
    message.textContent = text;
    message.classList.add('copy-message');
    message.setAttribute('role', 'status');
    if (isError) message.classList.add('error-toast');

    document.body.appendChild(message);

    setTimeout(() => message.classList.add('show'), 10);
    setTimeout(() => {
        message.classList.remove('show');
        setTimeout(() => message.remove(), 300);
    }, 2000);
}

// Agrega una operación al historial (la más reciente arriba, máximo MAX_HISTORY)
function addToHistory(mode, input, output) {
    const last = historyList.firstElementChild;
    if (last && last.dataset.mode === mode && last.dataset.input === input) return;

    const item = document.createElement('li');
    item.dataset.mode = mode;
    item.dataset.input = input;
    item.textContent = `${mode}: ${input} -> ${output}`;
    item.tabIndex = 0;
    item.setAttribute('role', 'button');

    // Al activarlo se vuelven a cargar los textos de esa operación
    const restore = () => {
        inputText.value = input;
        showOutput(output);
        clearError();
    };
    item.addEventListener('click', restore);
    item.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            restore();
        }
    });

    historyList.prepend(item);
    while (historyList.children.length > MAX_HISTORY) {
        historyList.lastElementChild.remove();
    }

    historyContainer.classList.remove('hidden');
}

function showError(message) {
    errorMessage.textContent = message;
    errorMessage.classList.remove('hidden');
}

function clearError() {
    errorMessage.textContent = '';
    errorMessage.classList.add('hidden');
}

// Agrega los eventos a los botones
encryptBtn.addEventListener('click', encrypt);
decryptBtn.addEventListener('click', decrypt);
copyBtn.addEventListener('click', copy);
