async function getPokemons() {
  try {
    const response = await fetch('./pokemones');
    const { pokemonList, error } = await response.json();
    if (error) {
      console.log(error);
      return [];
    }
    return pokemonList;
  } catch (error) {
    console.log(error);
    return [];
  }
}

async function renderPokemons(renderDiv) {
  const pokemonList = await getPokemons();
  const pokemonDivs = pokemonList.map((pokemon) => {
    return `
      <div class="pokemon">
        <img src="${pokemon.sprites.front_default}" alt="imagen de ${pokemon.name}" />
        <p>${pokemon.name}</p>
      </div>`;
  });
  renderDiv.innerHTML = pokemonDivs.join('');
}

export { getPokemons, renderPokemons };
