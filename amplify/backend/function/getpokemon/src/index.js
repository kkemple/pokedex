const axios = require("axios");

const buildPokemonUrl = id => `https://pokeapi.co/api/v2/pokemon/${id}`;

const buildImageUrl = id =>
  `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${id}.png`;

const leftPad = number => {
  if (number >= 10 && number < 100) {
    return `0${number}`;
  }

  if (number < 10) {
    return `00${number}`;
  }
};

const buildResponse = data => ({
  id: data.id,
  name: data.name,
  baseExp: data.base_experience,
  height: data.height,
  weight: data.weight,
  moves: data.moves.map(move => ({ id: move.move.name })),
  abilities: data.abilities.map(ability => ({
    id: ability.ability.name
  })),
  image: buildImageUrl(leftPad(data.id))
});

exports.handler = async function(event, context) {
  //eslint-disable-line
  const { id } = event.arguments;

  const { data } = await axios.get(buildPokemonUrl(id));

  context.done(null, buildResponse(data)); // SUCCESS with message
};
