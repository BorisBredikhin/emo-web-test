const gameState = {
    level: undefined,
}

const question = document.createElement('div')

const questionImg = document.createElement('img')
question.appendChild(questionImg)

const gameBoard = document.createElement('div')
gameBoard.classList.add('game-board')

gameBoard.appendChild(question)

$('#app').appendChild(gameBoard)

function setLevel(level) {
    gameState.level = {
        question: QUESTIONS[level],
        id: 1
    }

    $$('.menu > button').forEach(button => {
        const buttonLevel = parseInt(button.innerText)
        if (buttonLevel < level) {
            button.classList.add('completed')
            button.classList.remove('active')
        } else if (buttonLevel === level) {
            button.classList.remove('completed')
            button.classList.add('active')
        } else {
            button.classList.remove('completed')
            button.classList.remove('active')
        }
    })
}

setLevel(1)
// setLevel(2)
