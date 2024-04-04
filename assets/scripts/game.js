import formatData from "./helper.js";

const level = localStorage.getItem("level") || "medium";

const loader = document.querySelector("#loader");
const container = document.querySelector(".container");
const questionText = document.querySelector(".question__text");
const answerList = document.querySelectorAll(".answer__text");
const scoreText = document.querySelector(".score");
const nexBtn = document.querySelector(".next__btn");
const questionNumber = document.querySelector(".question__number");
const finishBtn = document.querySelector(".finish__btn");
const error = document.querySelector(".error")

const CORRECT_BONUS = 10;
const URL = `https://opentdb.com/api.php?amount=10&category=21&difficulty=${level}&type=multiple`;

let formattedData = null;
let questionIndex = 0;
let correctAnswer = null;
let score = 0;
let isAccept = true;

const fetchData = async () => {
  try{
    const response = await fetch(URL);
    const json = await response.json();
    formattedData = formatData(json.results);
    start();
  }catch{
    loader.style.display = "none";
    error.style.display = "block"
  }
};

const start = () => {
  showQuestion();
  loader.style.display = "none";
  container.style.display = "block";
};

const showQuestion = () => {
  questionNumber.innerText = questionIndex + 1;
  const { question, answers, correctAnswerIndex } =
    formattedData[questionIndex];
  correctAnswer = correctAnswerIndex;
  questionText.innerText = question;
  answerList.forEach((button, index) => {
    button.innerText = answers[index];
  });
};

const checkAnswer = (event, index) => {
  if (!isAccept) return;
  isAccept = false;
  const isCorrect = index === correctAnswer ? true : false;
  if (isCorrect) {
    event.target.classList.add("correct");
    score += CORRECT_BONUS;
    scoreText.innerText = score;
  } else {
    event.target.classList.add("incorrect");
    answerList[correctAnswer].classList.add("correct");
  }
};

const nextHandler = () => {
  questionIndex++;
  if (questionIndex < formattedData.length) {
    isAccept = true;
    removeClass();
    showQuestion();
  } else {
    finishHandler();
  }
};

const removeClass = () => {
  answerList.forEach((button) => {
    button.className = "answer__text";
  });
};

const finishHandler = () => {
  localStorage.setItem("score", JSON.stringify(score));
  window.location.assign("./end.html");
};

window.addEventListener("load", fetchData);
nexBtn.addEventListener("click", nextHandler);
finishBtn.addEventListener("click", finishHandler);
answerList.forEach((button, index) => {
  button.addEventListener("click", (event) => checkAnswer(event, index));
});
