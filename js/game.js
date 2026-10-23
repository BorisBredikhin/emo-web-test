const gameState = {
    level: undefined,
}

function setLevel(level) {
    gameState.level = {
        question: questions[level],
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