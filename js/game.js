class Game {
  constructor(gameContainer) {
    this.gameContainer = gameContainer;
  }
  setup() {
    const { gameBoard, questionImg, questionLabel } = this.createGameBoard();
    this.gameBoard = gameBoard;
    this.questionImg = questionImg;
    this.questionLabel = questionLabel;

    this.gameContainer.innerHTML = "";
    this.gameContainer.appendChild(gameBoard);
  }
  start() {
    this.setup();
    this.cross = new CrossButton();
    this.cross.setup(this, $("#app"));

    this.menu = new Menu(this);
    this.menu.setup($("#app"));
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
    if (level == this.gameState.questions.length) {
      this.showResults();
      return;
    }

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

  showResults() {
    $("#app").innerHTML = ``;

    const resultTable = document.createElement("table");
    $("#app").appendChild(resultTable);

    const tableHeader = document.createElement("tr");
    resultTable.appendChild(tableHeader);

    for (const title of [
      "#",
      "картинка",
      "правильный ответ",
      "твой ответ",
      "результат",
    ]) {
      const cell = document.createElement("td");
      cell.appendChild(markText(title));
      tableHeader.appendChild(cell);
    }

    for (let i = 0; i < this.gameState.questions.length; i++) {
      const question = this.gameState.questions[i];
      const result = this.gameState.results[i] || "";
      const tr = document.createElement("tr");
      resultTable.appendChild(tr);

      const label = markText(question.label);
      const resultMarked = markText(result);

      const correct =
        result.trim().toLowerCase() == question.label.trim().toLowerCase();

      tr.innerHTML = `
      <tr>
        <td>${i + 1}</td>
        <td><img src="imgs/${question.id}.png"></td>
        <td>${label.outerHTML}</td>
        <td>${resultMarked.outerHTML}</td>
        <td><img class="result-mark" src="imgs/${correct ? "check-green" : "cross"}.svg"></td>
      </tr>
      `;
    }

    this.cross.setup(this, $("#app"), "results");
  }
}

const game = new Game($("#app"));
game.start();
