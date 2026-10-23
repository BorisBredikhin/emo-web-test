const menu = document.createElement('div')
menu.classList.add('menu')

function createMenuButton(question) {
    const questionLink = document.createElement('button')
    const questionLinkContent = document.createElement('div')
    questionLinkContent.innerText = question.id
    questionLink.appendChild(questionLinkContent)
    return questionLink
}

for (let i = 0; i < questions.length; i++) {
    menu.appendChild(createMenuButton(questions[i]))
}

$('#app').appendChild(menu)