var player;
var rival;
var arenaLocation;
var playerMoveSet = [];
var rivalMoveSet = [];

function showDmg(target, damage) {
    var hpBar = $("#" + target + "-hp-bar");
    var hp = $("#" + target + "-current-hp");
    var value = hp.text();
    var pokemon = $("#" + target + "-pokemon").parent();

    pokemon.addClass("shake");
    setTimeout(function() {
        pokemon.removeClass("shake");
    }, 1000);

    if(damage < value)  {
        hpBar[0].value -= damage;
        hp.text(value - damage);
        endMatch(target);
        return;
    } else {
        hpBar[0].value = 0;
        hp.text("0");
    }

    if(hpBar[0].value < 75) {
        hpBar.removeClass("is-success");
        hpBar.addClass("is-warning");
    }
    if (hpBar[0].value <= 25) {
        hpBar.removeClass("is-success");
        hpBar.removeClass("is-warning");
        hpBar.addClass("is-danger");
    }

    updateLog(target, damage);
}

function updateLog(target, damage) {
    var attacker = "";
    var logElement = $("#battle-log")[0];

    if(target === "rival")
        attacker = $("#player-name")[0].textContent;
    else
        attacker = $("#rival-name")[0].textContent;

    logElement.value = attacker + " attacked " + $("#" + target + "-name")[0].textContent + " for " + damage + " damage.\n" + logElement.value;
}

function calculateDmg(move) {
    return Math.floor(Math.random() * 50);
}

function loadData() {
    player = JSON.parse(sessionStorage.getItem("player"));
    rival = JSON.parse(sessionStorage.getItem("rival"));
    arenaLocation = JSON.parse(sessionStorage.getItem("location"));

    var stageEl = $("#stage");
    var playerHPBarEl = $("#player-hp-bar");
    var playerCurrentHPEl = $("#player-current-hp");
    var playerMaxHPEl = $("#player-max-hp");
    var playerNameEl = $("#player-name");
    var playerPokemonEl = $("#player-pokemon")

    stageEl.css("background-image", "url(" + arenaLocation + ")");
    playerCurrentHPEl[0].textContent = playerMaxHPEl[0].textContent = playerHPBarEl[0].value = playerHPBarEl[0].max = player.pokemon.stats.health;
    playerPokemonEl[0].alt = playerNameEl[0].textContent = player.pokemon.name[0].toUpperCase() + player.pokemon.name.substring(1);
    playerPokemonEl[0].src = player.pokemon.sprite;

    var rivalHPBarEl = $("#rival-hp-bar");
    var rivalCurrentHPEl = $("#rival-current-hp");
    var rivalMaxHPEl = $("#rival-max-hp");
    var rivalNameEl = $("#rival-name");
    var rivalPokemonEl = $("#rival-pokemon")

    rivalCurrentHPEl[0].textContent = rivalMaxHPEl[0].textContent = rivalHPBarEl[0].value = rivalHPBarEl[0].max = rival.pokemon.stats.health;
    rivalPokemonEl[0].alt = rivalNameEl[0].textContent = rival.pokemon.name[0].toUpperCase() + rival.pokemon.name.substring(1);
    rivalPokemonEl[0].src = rival.pokemon.sprite;

    for(var i = 0; i < 4; i++) {
        var playerRand = Math.floor(Math.random() * player.pokemon.moves.length);
        var rivalRand = Math.floor(Math.random() * rival.pokemon.moves.length);

        playerMoveSet.push(player.pokemon.moves[playerRand]);
        rivalMoveSet.push(rival.pokemon.moves[rivalRand]);

        switch(i) {
            case 0: $("#attack1")[0].textContent = playerMoveSet[i].name;
                break;
            case 1: $("#attack2")[0].textContent = playerMoveSet[i].name;
                break;
            case 2: $("#attack3")[0].textContent = playerMoveSet[i].name;
                break;
            case 3: $("#attack4")[0].textContent = playerMoveSet[i].name;
                break;
        }
    }

    $(".attack").click(function() {
        var attack = $(this)[0].textContent;
        $(':button').prop('disabled', true);

        setTimeout(function() {
            $(':button').prop('disabled', false);
            showDmg("player", calculateDmg(attack));
        }, 3000);

        showDmg("rival", calculateDmg(attack));
    })
}

function endMatch() {
    
}

$(document).ready(function () {
    loadData();
});