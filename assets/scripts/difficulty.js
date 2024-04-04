const buttons = document.querySelectorAll(".level__btn");

const changeLevel = (event) => {
  const level = event.target.innerText.toLowerCase();
  localStorage.setItem("level", level);
  window.location.assign("/");
};

buttons.forEach((btn) => {
  btn.addEventListener("click", changeLevel);
});
