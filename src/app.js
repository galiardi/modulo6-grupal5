const path = require('path');
const express = require('express');

const app = express();

app.use(express.json());

app.use(express.static(path.join(__dirname, '..', 'public')));

app.get('/pokemones', async (req, res) => {
  try {
    const response = await fetch(
      'https://pokeapi.co/api/v2/pokemon/?offset=0&limit=150'
    );
    const { results } = await response.json();
    const promiseList = results.map((result) => {
      return fetch(result.url).then((response) => response.json());
    });
    const pokemonList = await Promise.all(promiseList);
    res.json({ pokemonList, error: null });
  } catch (error) {
    console.log(error);
    res.json({ pokemonList: null, error: error.code });
  }
});

module.exports = app;
