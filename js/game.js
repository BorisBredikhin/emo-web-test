const gameState = {
  level: undefined,
  questions: shuffle(QUESTIONS),
};

function createAnswerInput() {
  const inputWrapper = document.createElement("div");
  inputWrapper.classList.add("input-wrapper");
  const input = document.createElement("input");
  input.id = "user-input";
  inputWrapper.appendChild(input);

  // валидация и нормализация ввода
  input.addEventListener("keydown", function (event) {
    if (!validateKey(event.key)) {
      event.preventDefault();
    }
  });

  return inputWrapper;
}

function createGameBoard() {
  const question = document.createElement("div");

  const questionImg = document.createElement("img");
  question.appendChild(questionImg);
  questionImg.classList.add("question-image");

  const questionLabel = document.createElement("label");
  questionLabel.htmlFor = "user-input";
  question.appendChild(questionLabel);
  questionLabel.classList.add("question-label");

  question.appendChild(createAnswerInput());

  const gameBoard = document.createElement("div");
  gameBoard.classList.add("game-board");

  gameBoard.appendChild(question);
  return { gameBoard, questionImg, questionLabel };
}

const { gameBoard, questionImg, questionLabel } = createGameBoard();

$("#app").appendChild(gameBoard);

function setLevel(level) {
  gameState.level = gameState.questions[level];

  $$(".menu > button").forEach((button) => {
    const buttonLevel = parseInt(button.innerText);
    if (buttonLevel < level) {
      button.classList.add("completed");
      button.classList.remove("active");
    } else if (buttonLevel === level) {
      button.classList.remove("completed");
      button.classList.add("active");
    } else {
      button.classList.remove("completed");
      button.classList.remove("active");
    }
  });

  questionImg.src = `imgs/${gameState.level.id}.png`;
  questionLabel.innerText = `Напечатай: ${gameState.level.label}`;
}

setLevel(1);
// setLevel(2)
