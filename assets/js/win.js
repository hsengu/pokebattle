winPage = document.getElementById("win-page");
losePage = document.getElementById("lose-page");
winnerBtn = document.getElementById("winner");
var winner = sessionStorage.getItem("winner");
winner = winner ? JSON.parse(winner) : null;
var winners = localStorage.getItem("winner");
winners = winners ? JSON.parse(winners) : [];

// If a winner object exists, the player was the winner
if(winner) {
  winners.push(winner);
  sessionStorage.removeItem("winner");
  localStorage.setItem("winner", JSON.stringify(winners));
}

$(document).ready(function () {
  if (winner) {
    winPage.classList.remove("is-hidden");
  } else {
    losePage.classList.remove("is-hidden");
  }

  winnerBtn.addEventListener("click", function () {
    document.location.href = "./high-score.html";
  });
});
