const showScore = document.querySelector(".show__score");
const input = document.querySelector(".input__username");
const button = document.querySelector(".save__btn");

const score = JSON.parse(localStorage.getItem("score"));
const highScore = JSON.parse(localStorage.getItem("highScore")) || [];

showScore.innerText = score;

const saveHandler = () => {
  if (input.value && score) {
    const finalScore = { name: input.value, score: score };
    highScore.push(finalScore);
    highScore.sort((a, b) => b.score - a.score);
    highScore.splice(10);

    localStorage.setItem("highScore", JSON.stringify(highScore));
    localStorage.removeItem("score");
    window.location.assign("/");
  } else {
    alert("Invalid username or score!");
  }
};

button.addEventListener("click", saveHandler);
