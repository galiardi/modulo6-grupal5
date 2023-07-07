const path = require('path');
const express = require('express');

const app = express();

app.use(express.json());

app.use(express.static(path.join(__dirname, '..', 'public')));

app.get('/pokemones', async (req, res) => {
  const serverResponse = {
    data: null,
    error: null,
  };

  try {
    // throw new Error('Testeando captura de error en la ruta get /pokemones');

    const response = await fetch(
      'https://pokeapi.co/api/v2/pokemon/?offset=0&limit=150'
    );
    const { results } = await response.json();

    const promiseList = results.map((result) => {
      return fetch(result.url).then((response) => response.json());
    });
    const pokemonList = await Promise.all(promiseList);

    serverResponse.data = pokemonList;
  } catch (error) {
    console.log(error);
    serverResponse.error = error.message;
  }

  res.send(serverResponse);
});

module.exports = app;
