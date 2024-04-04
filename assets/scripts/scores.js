const list = document.querySelector(".list__score");

const highScores = JSON.parse(localStorage.getItem("highScore")) || [];

const content = highScores.map((item, index) => {
  return `
     <li class="list__score-item">
        <span>${index + 1}</span>
        <p>${item.name}</p>
        <span>${item.score}</span>
     </li>
    `;
});

list.innerHTML = content.join("");
