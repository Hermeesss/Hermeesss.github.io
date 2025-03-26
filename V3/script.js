
// Variáveis do jogo
let currentPhase = 0;
let lives = 3;
let timerInterval;
let timeLeft = 30; // 2 minutos em segundos
let inputCode = "";
const totalPhases = 5;
let randomPhases = [];

// Seleciona elementos
const startScreen      = document.getElementById('start-screen');
const gameScreen       = document.getElementById('game-screen');
const startButton      = document.getElementById('start-button');
const phaseDisplay     = document.getElementById('phase');
const timerDisplay     = document.getElementById('timer');
const livesDisplay     = document.getElementById('lives');
const codeDisplay      = document.getElementById('code-display');
const sendButton       = document.getElementById('send-button');
const keypadButtons    = document.querySelectorAll('.key');

// Seleciona botões das telas de vitória e derrota
const winScreen = document.getElementById("win-screen");
const winClose  = document.getElementById("win-close");
const winOk     = document.getElementById("win-ok");
const defScreen = document.getElementById("def-screen");
const defClose  = document.getElementById("def-close");
const defOk     = document.getElementById("def-ok");

// Eventos
startButton.addEventListener('click', startGame);
sendButton.addEventListener('click', checkCode);
keypadButtons.forEach(button => {
  button.addEventListener('click', () => {
    inputCode += button.getAttribute('data-key');
    updateCodeDisplay();
  });
});

// Atualiza o código exibido
function updateCodeDisplay() {
  codeDisplay.textContent = inputCode;
}

// Inicia o jogo: configura fase, vidas, timer e realiza a transição para a tela de jogo
function startGame() {
  currentPhase = 1;
  lives = 3;
  randomPhases = randomnumber();
  resetTimer();
  updatePhaseDisplay();
  updateLivesDisplay();
  inputCode = "";
  updateCodeDisplay();
  updateEmojis();

  // Transição: esconde tela inicial e exibe tela de jogo
  startScreen.classList.remove('visible');
  gameScreen.classList.add('visible');

  startTimer();
}

function updatePhase() {
  if (currentPhase < totalPhases) {
    currentPhase++;
    resetTimer();
    updatePhaseDisplay();
    inputCode = "";
    updateCodeDisplay();
    updateEmojis(); // Atualiza os emojis para a nova fase
  } else if (currentPhase === totalPhases) {
    // Fim da fase 5 concluída:
    showWinScreen();
  }
}

function showWinScreen() {
  clearInterval(timerInterval);
  winScreen.classList.add("visible");
}

// Eventos para fechar as telas de vitória e derrota
winClose.addEventListener("click", () => {
  winScreen.classList.remove("visible");
  resetGame();
});
winOk.addEventListener("click", () => {
  winScreen.classList.remove("visible");
  resetGame();
});

function showDefScreen() {
  clearInterval(timerInterval);
  defScreen.classList.add("visible");
}
defClose.addEventListener("click", () => {
  defScreen.classList.remove("visible");
  resetGame();
});
defOk.addEventListener("click", () => {
  defScreen.classList.remove("visible");
  resetGame();
});

// Botão de apagar
const deleteButton = document.getElementById('delete-button');
deleteButton.addEventListener('click', () => {
  inputCode = inputCode.slice(0, -1);
  updateCodeDisplay();
});

function updatePhaseDisplay() {
  phaseDisplay.textContent = `Fase: ${currentPhase} de ${totalPhases}`;
}

function updateLivesDisplay() {
  livesDisplay.innerHTML = "";
  for (let i = 0; i < lives; i++) {
    livesDisplay.innerHTML += `<img src="../Assets/Imgs/heart.png" alt="Coração" class="heart-img">`;
  }
}

// Reseta o timer para 2 minutos
function resetTimer() {
  clearInterval(timerInterval);
  timeLeft = 30;
  updateTimerDisplay();
  startTimer();
}

// Atualiza a exibição do timer (mm:ss)
function updateTimerDisplay() {
  let minutes = Math.floor(timeLeft / 60);
  let seconds = timeLeft % 60;
  timerDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

// Inicia o timer regressivo
function startTimer() {
  clearInterval(timerInterval);
  timerInterval = setInterval(() => {
    if (timeLeft > 0) {
      timeLeft--;
      updateTimerDisplay();
    } else {
      clearInterval(timerInterval);
      gameOver();
    }
  }, 1000);
}

// Verifica se o código digitado está correto
function checkCode() {
  const correctCode = randomPhases[currentPhase - 1];
  if (inputCode === correctCode) {
    updatePhase();
  } else {
    lives--;
    updateLivesDisplay();
    inputCode = "";
    updateCodeDisplay();
    if (lives <= 0) {
      gameOver();
    }
  }
}

// Exibe a tela de derrota em caso de Game Over
function gameOver() {
  clearInterval(timerInterval);
  showDefScreen();
}

// Reinicia o jogo e retorna à tela inicial com transição suave
function resetGame() {
  clearInterval(timerInterval);
  gameScreen.classList.remove("visible");

  setTimeout(() => {
    currentPhase = 0;
    lives = 3;
    timeLeft = 30;
    inputCode = "";
    updateCodeDisplay();
    updatePhaseDisplay();
    updateLivesDisplay();
    startScreen.classList.add("visible");
  }, 500);
}

function randomnumber() {
  let maximo = 28;
  let arr = [];
  for (let i = 0; i < maximo; i++) {
    arr[i] = (i + 1).toString().padStart(2, "0");
  }
  // Embaralha o array
  for (let p = arr.length; p;) {
    let n = Math.random() * p-- | 0;
    [arr[p], arr[n]] = [arr[n], arr[p]];
  }
  return arr;
}

function getEmojisByCode(code) {
  const emojis = {
    "01": "📷🤔😟👊",
    "02": "🎶💀🤐☠️",
    "03": "⚔️👴💥🐂",
    "04": "📖🧠🤪🔮",
    "05": "⚡🔧🤪💥",
    "06": "☠️🎨🌑🔭",
    "07": "🎸🤘💢🔫",
    "08": "📜🤔✍️🔮",
    "09": "🤪🔫🌀🍀",
    "10": "☠️👿🪚🎯",
    "11": "🎶💖😁🫂",
    "12": "📚🐕😏🤓",
    "13": "🍔😁💪🛡️",
    "14": "🧸❤️🧙‍♂️🤝",
    "15": "🎙️💄🩸⭐",
    "16": "📒📐😤✔️",
    "17": "⚡😈💅🧨",
    "18": "😐🖤💀🔪",
    "19": "😎🪞💘🥰",
    "20": "📝🤔🥋🌀",
    "21": "🤳🏅⚡📸",
    "22": "🌑🔪🔫☠️",
    "23": "🤥🏹🩸🦊",
    "24": "📖💡😰🎒",
    "25": "⚡🥇🏃‍♂️🗣️",
    "26": "🍃💀🌙🤍",
    "27": "🤬💪🪓💥",
    "28": "🌀😵‍💫👥🔮"
  };

  return emojis[code] || "❓❓❓❓❓";
}

function updateEmojis() {
  let code = randomPhases[currentPhase - 1];
  document.getElementById("emojis").textContent = getEmojisByCode(code);
}