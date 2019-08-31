const axios = require("axios");

const buildPokemonUrl = (limit, offset) =>
  `https://pokeapi.co/api/v2/pokemon/?limit=${limit}&offset=${offset}`;

const buildImageUrl = id =>
  `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${id}.png`;

const leftPad = number => {
  if (number >= 10 && number < 100) {
    return `0${number}`;
  }

  if (number < 10) {
    return `00${number}`;
  }

  return number;
};

const buildResponse = data =>
  data.map(pokemon => ({
    id: pokemon.id,
    name: pokemon.name,
    baseExp: pokemon.base_experience,
    height: pokemon.height,
    weight: pokemon.weight,
    moves: pokemon.moves.map(move => ({ id: move.move.name })),
    abilities: pokemon.abilities.map(ability => ({
      id: ability.ability.name
    })),
    image: buildImageUrl(leftPad(pokemon.id))
  }));

exports.handler = async function(event, context) {
  const nextToken = event.arguments.nextToken || 0;
  const limit = event.arguments.limit || 20;

  try {
    const { data } = await axios.get(buildPokemonUrl(limit, nextToken));

    const pokemon = await Promise.all(
      data.results.map(pokemon => axios.get(pokemon.url))
    );

    context.done(null, {
      nextToken: nextToken + data.results.length,
      items: buildResponse(pokemon.map(p => p.data))
    });
  } catch (error) {
    context.done(error);
  }
};
