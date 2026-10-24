class Game {
  constructor(gameContainer) {
    const { gameBoard, questionImg, questionLabel } = this.createGameBoard();
    this.gameBoard = gameBoard;
    this.questionImg = questionImg;
    this.questionLabel = questionLabel;

    gameContainer.appendChild(gameBoard);

    this.cross = new CrossButton();
    this.cross.setup(this, $("#app"));

    this.menu = new Menu(this);
    this.menu.setup($("#app"));
  }
  start() {
    this.gameState = {
      level: 0,
      questions: shuffle(QUESTIONS),
      results: QUESTIONS.map(() => undefined), // ответы. undefined - отсутствие ответа. Не использую пустой массив для упрощения обработки.
    };
    this.menu.restart();
    this.setLevel(0);
  }
  createAnswerInput(parent) {
    const inputWrapper = document.createElement("div");
    inputWrapper.classList.add("input-wrapper");
    this.input = document.createElement("input");
    this.input.id = "user-input";
    inputWrapper.appendChild(this.input);

    this.inputButton = document.createElement("button");
    inputWrapper.appendChild(this.inputButton);

    this.setInputButtonEnabled(false);

    // валидация и нормализация ввода
    this.input.addEventListener("keydown", function (event) {
      if (!validateKey(event.key)) {
        event.preventDefault();
      }
    });
    this.input.addEventListener("keyup", () => this.processUserInput());
    this.inputButton.addEventListener("click", () => this.advanceLevel());

    parent.appendChild(inputWrapper);
  }

  createGameBoard() {
    const question = document.createElement("div");

    const questionImgContainer = document.createElement("div");
    question.appendChild(questionImgContainer);
    questionImgContainer.classList.add("question-image");

    const questionImg = document.createElement("img");
    questionImg.draggable = false;
    questionImgContainer.appendChild(questionImg);

    const questionLabel = document.createElement("label");
    questionLabel.htmlFor = "user-input";
    question.appendChild(questionLabel);
    questionLabel.classList.add("question-label");

    this.createAnswerInput(question);

    const gameBoard = document.createElement("div");
    gameBoard.classList.add("game-board");

    gameBoard.appendChild(question);
    return { gameBoard, questionImg, questionLabel };
  }

  setLevel(level) {
    this.gameState.level = level;

    this.menu.updateLevel(this.gameState.level);

    this.questionImg.src = `imgs/${this.gameState.questions[this.gameState.level].id}.png`;
    this.questionLabel.innerText = `Напечатай: ${this.gameState.questions[this.gameState.level].label}`;

    this.input.value = this.gameState.results[this.gameState.level] || "";
    this.setInputButtonEnabled(this.input.value.length > 0);
  }

  setInputButtonEnabled(enabled) {
    this.inputButton.innerHTML = `<img src="imgs/check${enabled ? "-green" : ""}.svg">`;
    this.inputButton.disabled = !enabled;
  }

  processUserInput() {
    const inputContainsText = this.input.value.length > 0;
    this.setInputButtonEnabled(inputContainsText);
  }

  advanceLevel() {
    this.gameState.results[this.gameState.level] = this.input.value;
    this.setInputButtonEnabled(false);
    this.input.value = this.gameState.results[this.gameState.level + 1] || "";
    this.setLevel(this.gameState.level + 1);
  }
}

const game = new Game($("#app"));
game.start();
