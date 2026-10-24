const QUESTIONS = (() => {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", "questions.json", false);
  xhr.send();
  return JSON.parse(xhr.responseText);
})();
