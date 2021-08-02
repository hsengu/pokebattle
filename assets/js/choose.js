var player = {
  name: "player",
  pokemon: {}
}

var rival = {
  name: "rival",
  pokemon: {}
}

var pokemon;
var location;
var movesList = [];

function getPokemon(trainer, choice) {
  if(choice === null)
    choice = Math.floor(Math.random() * 151);
  fetch("https://pokeapi.co/api/v2/pokemon/" + choice).then(function (response) {
    if(response.ok)
      return response.json();
    else {
      var errorEl = $("#error-modal");
      errorEl.addClass("is-active");
      $("#error-message").html("<p><strong>API Error:</strong> " + response.status + " - " + response.message + "</p>");
    }
  }).then(function(data) {
      pokemon = {
      name: data.name,
      moves: [],
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
      //console.log(data);

      var apiRequests = [];
      for(var i = 0; i < data.moves.length; i++) {
        apiRequests.push(fetch(data.moves[i].move.url));
      }

      Promise.all(apiRequests).then(responses => {
        for(let response of responses) {
          if(response.status !== 200) {
            var errorEl = $("#error-modal");
            errorEl.addClass("is-active");
            $("#error-message").html("<p><strong>API Error:</strong> " + response.status + " - " + response.message + "</p>");
            break;
          }
          return responses;
        }
      }).then(responses => Promise.all(responses.map(response => response.json()))).then(moves => moves.forEach(move => {
        if(move.power !== null) {
          var moveObj = {
            name: move.name,
            power: move.power,
            accuracy: move.accuracy,
            type: move.type.name
          }
          movesList.push(moveObj);
        }
      })).then(function() {
        pokemon.moves = movesList;
        movesList = [];
        //console.log(pokemon.moves);
      });

    if(trainer === "rival") {
      rival.pokemon = pokemon;
      sessionStorage.setItem("rival", JSON.stringify(rival));
      console.log(rival);
    }
    else {
      player.pokemon = pokemon;
      sessionStorage.setItem("player", JSON.stringify(player));
      console.log(player)
    }
  });
}

function getLocation() {

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
  getPokemon("rival", null);
  getLocation();
});