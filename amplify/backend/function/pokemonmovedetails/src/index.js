const axios = require("axios");

const buildMoveUrl = id => `https://pokeapi.co/api/v2/move/${id}`;

const buildResponse = data => {
  const name = data.names.find(name => name.language.name === "en");
  const flavorText = data.flavor_text_entries.find(
    ft => ft.language.name === "en"
  );

  return {
    name: name.name,
    effect: data.effect_entries[0].short_effect,
    flavorText: flavorText.flavor_text
  };
};

exports.handler = async function(event, context) {
  //eslint-disable-line
  const { data } = await axios.get(buildMoveUrl(event.source.id));

  context.done(null, buildResponse(data));
};
