class Menu {
  constructor(game) {
    this.game = game;
  }
  createMenuButton(questionIdx) {
    const questionLink = document.createElement("button");
    const questionLinkContent = document.createElement("div");
    questionLinkContent.innerText = questionIdx + 1;
    questionLink.appendChild(questionLinkContent);
    return questionLink;
  }
  setup(parent) {
    this.menu = document.createElement("div");
    this.menu.classList.add("menu");
    for (let i = 0; i < QUESTIONS.length; i++) {
      this.menu.appendChild(this.createMenuButton(i));
    }

    parent.appendChild(this.menu);
  }
}
