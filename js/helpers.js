const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function validateKey(key) {
  return key.length > 1 || key.toLowerCase().match(/[а-яё]| |-/);
}

function markText(text) {
  result = document.createElement("div");
  for (const letter of text.toUpperCase()) {
    const span = document.createElement("span");
    span.innerText = letter;
    if (VOWELS.includes(letter)) {
      span.classList.add("vowel");
    }
    result.appendChild(span);
  }
  return result;
}
