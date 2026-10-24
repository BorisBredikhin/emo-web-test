class Menu {
  constructor(game) {
    this.game = game;
    this.buttons = [];
  }
  createMenuButton(questionIdx) {
    const questionLink = document.createElement("button");
    const questionLinkContent = document.createElement("div");
    questionLinkContent.innerText = questionIdx + 1;
    questionLink.appendChild(questionLinkContent);
    questionLink.addEventListener("click", () =>
      this.handleMenuItemClick(questionIdx),
    );
    return questionLink;
  }
  setup(parent) {
    this.menu = document.createElement("div");
    this.menu.classList.add("menu");
    for (let i = 0; i < QUESTIONS.length; i++) {
      this.buttons.push(this.createMenuButton(i));
      this.menu.appendChild(this.buttons[this.buttons.length - 1]);
    }

    parent.appendChild(this.menu);
  }

  updateLevel(level) {
    $$(".menu > button").forEach((button) => {
      const buttonLevel = parseInt(button.innerText) - 1;
      if (this.game.gameState.results[buttonLevel]) {
        button.classList.add("completed");
      }
      if (buttonLevel === level) {
        button.classList.remove("completed");
        button.classList.add("active");
      } else {
        button.classList.remove("active");
      }
    });
  }

  handleMenuItemClick(level) {
    if (this.game.gameState.results[level]) {
      this.game.setLevel(level);
    }
  }
}
