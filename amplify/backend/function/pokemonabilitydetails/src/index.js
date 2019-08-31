const axios = require("axios");

const buildAbilityUrl = id => `https://pokeapi.co/api/v2/ability/${id}`;

const buildResponse = data => {
  const name = data.names.find(name => name.language.name === "en");
  return {
    name: name.name,
    effect: data.effect_entries[0].short_effect
  };
};

exports.handler = async function(event, context) {
  //eslint-disable-line

  const { data } = await axios.get(buildAbilityUrl(event.source.id));

  context.done(null, buildResponse(data)); // SUCCESS with message
};
