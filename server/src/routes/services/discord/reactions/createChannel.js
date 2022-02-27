const fetch = require('node-fetch');
const { verifUserLinkDiscord } = require('../utils');

const createChannel = async (instance) => {
  // Get required informations

  const params = instance.reaction.params.reduce((a, c) => ({ ...a, [c.name]: c.value }), {});

  // Verify if user is subscribe to discord

  const user = await verifUserLinkDiscord(instance.userId);

  // Create issue with given parameters

  const response = await fetch(`https://discordapp.com/api/guilds/${user.discord.guild}/channels`, {
    method: 'POST',
    body: JSON.stringify({
      name: params.name,
      topic: params.topic,
      type: params.type.value,
      parent_id: params.place.id, // need to have a null parent_id for not placing it somewhere
    }),
    headers: {
      Accept: 'application/vnd.github.v3+json',
      Authorization: `Bot ${process.env.DISCORD_BOT_TOKEN}`,
    },
  });
  const data = await response.json();

  if (response.status >= 300) {
    console.error(data);
    throw Error(`An error appended when creating an channel in ${user.guild.name}`);
  }
};

module.exports = createChannel;
