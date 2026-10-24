const menu = document.createElement("div");
menu.classList.add("menu");

function createMenuButton(questionIdx) {
  const questionLink = document.createElement("button");
  const questionLinkContent = document.createElement("div");
  questionLinkContent.innerText = questionIdx + 1;
  questionLink.appendChild(questionLinkContent);
  return questionLink;
}

for (let i = 0; i < QUESTIONS.length; i++) {
  menu.appendChild(createMenuButton(i));
}

$("#app").appendChild(menu);
