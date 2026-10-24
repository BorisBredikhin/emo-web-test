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

  const inputButton = document.createElement("button");
  inputWrapper.appendChild(inputButton);
  inputButton.innerHTML = '<img src="imgs/check.svg">';

  // валидация и нормализация ввода
  input.addEventListener("keydown", function (event) {
    if (!validateKey(event.key)) {
      event.preventDefault();
    }
  });
  input.addEventListener("keyup", function () {
    inputButton.innerHTML = `<img src="imgs/check${input.value.length > 0 ? "-green" : ""}.svg">`;
  });

  return inputWrapper;
}

function createGameBoard() {
  const question = document.createElement("div");

  const questionImgContainer = document.createElement("div");
  question.appendChild(questionImgContainer);
  questionImgContainer.classList.add("question-image");

  const questionImg = document.createElement("img");
  questionImgContainer.appendChild(questionImg);

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
