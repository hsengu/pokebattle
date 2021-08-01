function attack(target) {

}

function showDmg(target, damage) {
    var hpBar = $("#" + target + "-hp-bar");
    var hp = $("#" + target + "-current-hp");
    var value = hp.text();
    var pokemon = $("#" + target + "-pokemon");

    pokemon.addClass("shake");
    setTimeout(function() {
        pokemon.removeClass("shake");
    }, 1000);

    if(damage < value)  {
        hpBar[0].value -= damage;
        hp.text(value - damage);
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