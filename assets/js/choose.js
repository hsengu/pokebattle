fetch(
    "https://pokeapi.co/api/v2/pokemon/charizard"
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
    
console.log(data);
     
    });