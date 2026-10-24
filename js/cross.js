class CrossButton {
  constructor() {
    this.cross = document.createElement("img");
    this.cross.classList.add("cross");
    this.cross.src = "imgs/cross.svg";
  }

  setup(game, parent) {
    parent.appendChild(this.cross);
    this.cross.addEventListener("click", () => game.start());
  }
}
