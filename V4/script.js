// ========================
// SELEÇÃO DE ELEMENTOS
// ========================
const startScreen          = document.getElementById('start-screen');
const facilButton          = document.getElementById('Facil');
const medioButton          = document.getElementById('Medio');
const dificilButton        = document.getElementById('Dificil');

// Telas de “flash” das cores
const gameScreenFacil      = document.getElementById('game-screen-facil');
const gameScreenMedio      = document.getElementById('game-screen-medio');
const gameScreenDificil    = document.getElementById('game-screen-dificil');

// Telas de seleção de cores (após flash)
const gameScreenFacil2     = document.getElementById('game-screen-facil2');
const gameScreenMedio2     = document.getElementById('game-screen-medio2');
const gameScreenDificil2   = document.getElementById('game-screen-dificil2');

// Botões de cores
const colorButtons         = document.querySelectorAll('.color-button');

// Telas de vitória e derrota
const winScreen            = document.getElementById("win-screen");
const winClose             = document.getElementById("win-close");
const winOk                = document.getElementById("win-ok");
const defScreen            = document.getElementById("def-screen");
const defClose             = document.getElementById("def-close");
const defOk                = document.getElementById("def-ok");

// ========================
// SEQUÊNCIAS DE CORES
// ========================
const sequenceFacil = [
  "#39FF14", "#FFFF33", "#FF073A", "#B026FF", "#1F51FF",
  "#B026FF", "#FF073A", "#39FF14", "#1F51FF", "#FFFF33"
];
const sequenceMedio = [
  "#FFFF33", "#B026FF", "#1F51FF", "#39FF14", "#FF073A",
  "#39FF14", "#1F51FF", "#B026FF", "#FFFF33", "#FF073A",
  "#B026FF", "#39FF14", "#FFFF33", "#1F51FF", "#FF073A"
];
const sequenceDificil = [
  "#1F51FF", "#FF073A", "#FFFF33", "#39FF14", "#B026FF",
  "#FFFF33", "#39FF14", "#FF073A", "#B026FF", "#1F51FF",
  "#B026FF", "#39FF14", "#FFFF33", "#1F51FF", "#FF073A",
  "#39FF14", "#B026FF", "#FFFF33", "#1F51FF", "#FF073A"
];

// ========================
// VARIÁVEIS GLOBAIS
// ========================
let currentSequence = [];     // Armazena qual sequência está sendo executada
let selectedColors  = [];     // Armazena sequência de cores escolhidas pelo jogador

// ========================
// FUNÇÕES DE TELA
// ========================

// Fecha todas as telas, exceto a de Start
function resetGame() {
  // Telas de flash
  gameScreenFacil.classList.remove('visible');
  gameScreenMedio.classList.remove('visible');
  gameScreenDificil.classList.remove('visible');
  // Telas de seleção
  gameScreenFacil2.classList.remove('visible');
  gameScreenMedio2.classList.remove('visible');
  gameScreenDificil2.classList.remove('visible');
  // Volta para a tela inicial
  startScreen.classList.add('visible');
}

function showWinScreen() {
  // Primeiro, esconde todos os parágrafos
  document.getElementById("p1").style.display = "none";
  document.getElementById("p2").style.display = "none";
  document.getElementById("p3").style.display = "none";

  // Verifica qual a sequência atual e exibe o parágrafo correspondente
  if (currentSequence === sequenceFacil) {
    // Se for o modo fácil, exibe somente p1
    document.getElementById("p1").style.display = "block";
  } else if (currentSequence === sequenceMedio) {
    // Se for o modo médio, exibe somente p2
    document.getElementById("p2").style.display = "block";
  } else if (currentSequence === sequenceDificil) {
    // Se for o modo difícil, exibe somente p3
    document.getElementById("p3").style.display = "block";
  }

  // Exibe a tela de vitória
  winScreen.classList.add("visible");
}


// Mostra tela de Derrota
function showDefScreen() {
  defScreen.classList.add("visible");
}

// ========================
// EVENTOS: Botões Fechar
// ========================

// Vitória
winClose.addEventListener("click", () => {
  winScreen.classList.remove("visible");
  resetGame();
});
winOk.addEventListener("click", () => {
  winScreen.classList.remove("visible");
  resetGame();
});

// Derrota
defClose.addEventListener("click", () => {
  defScreen.classList.remove("visible");
  resetGame();
});
defOk.addEventListener("click", () => {
  defScreen.classList.remove("visible");
  resetGame();
});

// ========================
// FUNÇÃO DE COMPARAÇÃO
// ========================
// Verifica se a sequência selecionada pelo jogador
// está correta em relação à sequence do nível
function checkSequence(sequence) {
  const isCorrect = selectedColors.every(
    (color, index) => color === sequence[index]
  );
  if (isCorrect) {
    showWinScreen();
  } else {
    showDefScreen();
  }
  // Limpa o array para reiniciar, caso precise
  selectedColors.length = 0;
}

// ========================
// EVENTOS: Botões de Cor
// ========================
colorButtons.forEach(button => {
  button.addEventListener('click', () => {
    // Pega a cor do botão clicado
    const colorValue = button.value;
    selectedColors.push(colorValue);
    // Se o jogador já clicou em todos os botões da sequência,
    // chamamos a verificação
    if (selectedColors.length === currentSequence.length) {
      checkSequence(currentSequence);
    }
  });
});

// ========================
// FUNÇÃO: Mostra Sequência
// ========================
/**
 * Exibe cada cor na tela dentro de um container (flashElement),
 * por um tempo "flashDuration", e depois pausa por "gapDuration"
 * entre cada cor.
 */
function playColorSequence(colorSequence, flashDuration, gapDuration, flashElementId) {
  const flashElement = document.getElementById(flashElementId);
  let index = 0;

  function flashNext() {
    if (index < colorSequence.length) {
      flashElement.style.backgroundColor = colorSequence[index];
      flashElement.style.opacity = 1;
      setTimeout(() => {
        // Some com a cor
        flashElement.style.opacity = 0;
        index++;
        setTimeout(flashNext, gapDuration);
      }, flashDuration);
    } else {
      // Quando terminar a sequência de flash, trocar
      // a tela “flash” pela tela de seleção
      if (colorSequence.length === 10) {
        // FÁCIL
        setTimeout(() => {
          gameScreenFacil.classList.remove('visible');
          gameScreenFacil2.classList.add('visible');

        }, 800);
      } else if (colorSequence.length === 15) {
        // MÉDIO
        setTimeout(() => {
          gameScreenMedio.classList.remove('visible');
          gameScreenMedio2.classList.add('visible');
        }, 800);
      } else {
        // DIFÍCIL
        setTimeout(() => {
          gameScreenDificil.classList.remove('visible');
          gameScreenDificil2.classList.add('visible');
        }, 800);
      }
    }
  }
  flashNext();
}

// ========================
// EVENTOS: Botões de Dificuldade
// ========================
facilButton.addEventListener('click', () => {
  startScreen.classList.remove('visible');
  gameScreenFacil.classList.add('visible');
  currentSequence = sequenceFacil;

  // Ajuste de tempos (flash e intervalo)
  const flashDuration = 800;
  const gapDuration   = 500;
  playColorSequence(currentSequence, flashDuration, gapDuration, "color-flash-facil");
});

medioButton.addEventListener('click', () => {
  startScreen.classList.remove('visible');
  gameScreenMedio.classList.add('visible');
  currentSequence = sequenceMedio;

  const flashDuration = 600;
  const gapDuration   = 400;
  playColorSequence(currentSequence, flashDuration, gapDuration, "color-flash-medio");
});

dificilButton.addEventListener('click', () => {
  startScreen.classList.remove('visible');
  gameScreenDificil.classList.add('visible');
  currentSequence = sequenceDificil;

  const flashDuration = 400;
  const gapDuration   = 300;
  playColorSequence(currentSequence, flashDuration, gapDuration, "color-flash-dificil");
});
