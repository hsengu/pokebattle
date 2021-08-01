var player = {
  name: "player",
  pokemon: {}
}

var rival = {
  name: "rival",
  pokemon: {}
}

var pokemon;

function getPokemon(trainer, choice) {
  fetch("https://pokeapi.co/api/v2/pokemon/" + choice).then(function (response) {
    if(response.ok)
      return response.json();
    else {
      var errorEl = $("#error-modal");
      errorEl.addClass("is-active");
      console.log(errorEl);
      $("#error-message").html("<p>API Error: " + response.status + " - " + response.message + "</p>");
    }
  }).then(function(data) {
      pokemon = {
      name: data.name,
      movelist: {},
      stats: {
        health: data.stats[0].base_stat,
        attack: data.stats[1].base_stat,
        defense: data.stats[2].base_stat,
        special_attack: data.stats[3].base_stat,
        special_defense: data.stats[4].base_stat,
        speed: data.stats[5].base_stat,
      },
      sprite: (trainer === rival) ? data.sprites.versions['generation-v']['black-white'].animated.front_default : data.sprites.versions['generation-v']['black-white'].animated.back_default
    };

    if(trainer === "rival") {
      rival.pokemon = pokemon;
    }
    else {
      player.pokemon = pokemon;
    }
  });
}

$("#player-ok").click(function(event) {
  event.preventDefault();
  player.name = $("#player-name").val();
  $(this).parent().parent().parent().parent().removeClass("is-active");
})

$(".modal-close").click(function () {
  $(this).parent().removeClass("is-active");
});

$(".button").click(function() {
  var pick = $(this).attr("id");
  getPokemon("player", pick);
  sessionStorage.setItem("player", JSON.stringify(player));
  getPokemon("rival", pick);
  sessionStorage.setItem("rival", JSON.stringify(rival));

  console.log(player);
  console.log(rival);
});