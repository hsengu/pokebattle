var ulEl = document.getElementById("championList");

// Choose page needs to match
var trainerInputEl = trainerInputEl.value;

var endGame = function() {
  
    // check localStorage for winners, if no winners
    var win = localStorage.getItem("win");
    if (win === null) {
      win = "No Masters";
    }

    // if winners exist set the win name
    if (trainerInfo.win === win) {
      localStorage.setItem("win", trainerInfo.name);
    }
    var winner = trainerInputEl.value

   
    var newWinner = document.createElement("li");
    newWinner.textContent = winner;
    searchEl.appendChild(newWinner);
};

endGame ();