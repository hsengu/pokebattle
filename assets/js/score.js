var ulEl = document.getElementById("championList");

// // Choose page needs to match
// var trainerInputEl = document.getElementById("player-name");
// var trainer = [];

function endgame() {
// var winner = trainerInputEl.value;

// var newWinner = document.createElement("li");
// newWinner.textContent = winner;
// ulEl.appendChild(newWinner);

//     // check localStorage for winners, if no winners
//     if (JSON.parse(localStorage.getItem("player-name")) === null) {
//       trainer = [];
//     } else {
//       //parse out the items in local storage to JSON
//       trainer = JSON.parse(localStorage.getItem("player-name"));
//     }
//    trainer.push(winner);
//     localStorage.setItem("player-name", JSON.stringify(trainer));
var highScore = localStorage.getItem("winner");
highScore=JSON.parse(highScore);

for (let i = 0; i < highScore.length; i++) {
  var newWinner = document.createElement("li")
  newWinner.textContent = highScore[i].name+" "+" & "+highScore[i].pokemon;
  ulEl.appendChild(newWinner);
};
}


endgame();