async function getPokemons() {
  try {
    const response = await fetch('./pokemones');
    const { data: pokemonList, error } = await response.json();
    if (error) {
      console.log(error);
      return { error };
    }
    return { pokemonList };
  } catch (error) {
    console.log(error);
    return { error: error.message };
  }
}

async function renderPokemons(renderDiv) {
  const { pokemonList, error } = await getPokemons();
  if (pokemonList) {
    const pokemonDivs = pokemonList.map((pokemon) => {
      return `
      <div class="pokemon">
        <img src="${pokemon.sprites.front_default}" alt="imagen de ${pokemon.name}" />
        <p>${pokemon.name}</p>
      </div>`;
    });
    renderDiv.innerHTML = `<div class="pokemon-list">${pokemonDivs.join(
      ''
    )}</div>`;
  }

  if (error) {
    renderDiv.innerHTML = `<p class="error">Error al solicitar los pokemones: ${error}</p>`;
  }
}

export { getPokemons, renderPokemons };
