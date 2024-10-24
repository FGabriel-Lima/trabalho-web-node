document.addEventListener('DOMContentLoaded', function() {
  const pokemonList = document.getElementById('pokemon-list');
  const pokemonForm = document.getElementById('pokemon-form');

  // Função para buscar e exibir Pokémons
  function loadPokemons() {
    fetch('http://localhost:3000/api/pokemons')
      .then(response => response.json())
      .then(data => {
        pokemonList.innerHTML = ''; // Limpar lista antes de adicionar novos elementos
        data.forEach(pokemon => {
          const pokemonCard = document.createElement('div');
          pokemonCard.classList.add('pokemon-card');

          pokemonCard.innerHTML = `
            <img src="${pokemon.image}" alt="${pokemon.name}">
            <h2>${pokemon.name}</h2>
            <p>Número: ${pokemon.number}</p>
            <p>Tipo: ${pokemon.type}</p>
          `;

          pokemonList.appendChild(pokemonCard);
        });
      })
      .catch(error => {
        console.error('Erro ao buscar Pokémons:', error);
      });
  }

  // Carregar Pokémons ao carregar a página
  loadPokemons();

  // Manipulador de eventos para o envio do formulário
  pokemonForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const number = document.getElementById('number').value;
    const type = document.getElementById('type').value;
    const image = document.getElementById('image').value;

    const newPokemon = { name, number, type, image };

    fetch('http://localhost:3000/api/pokemons', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newPokemon)
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Erro ao adicionar Pokémon');
      }
      return response.json();
    })
    .then(data => {
      console.log('Pokémon adicionado:', data);
      loadPokemons(); // Recarregar lista de Pokémons após adicionar um novo
      pokemonForm.reset(); // Limpar formulário após submissão
    })
    .catch(error => {
      console.error('Erro ao adicionar Pokémon:', error);
    });
  });
});
