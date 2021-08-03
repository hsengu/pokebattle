winPage = document.getElementById("win-page");
losePage = document.getElementById("lose-page");
winnerBtn = document.getElementById("winner");

if (win === true) {
    winPage.style.display = "block";
} else {
    losePage.style.display = "block";
}

winner.addEventListener("click", function(){
    document.location.href = './high-score.html';
});