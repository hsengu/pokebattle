var ulEl = document.getElementById("championList");

// Output winners table
function endgame() {
  var highScore = localStorage.getItem("winner");
  highScore=JSON.parse(highScore);

  for (let i = 0; i < highScore.length; i++) {
    var newWinner = document.createElement("li")
    newWinner.textContent = highScore[i].name+" "+" & "+highScore[i].pokemon;
    ulEl.appendChild(newWinner);
  };
}

endgame();