const fetch = require('node-fetch');
const { verifUserLinkDiscord } = require('../utils');

const getCategoryChannels = async (req, res) => {
  try {
    // Verify if user is subscribe to discord

    const user = await verifUserLinkDiscord(req.userId);

    // Final verification to get the access token from discord

    console.log(user);

    const response = await fetch(`https://discordapp.com/api/guilds/${user.discord.guildId}/channels`, {
      method: 'GET',
      headers: {
        Authorization: `Bot ${process.env.DISCORD_BOT_TOKEN}`,
      },
    });

    console.log('\n\nresponse begin\n\n', response, '\n\nresponse end\n\n');

    const data = await response.json();

    console.log('\n\ndata begin\n\n', data, '\n\ndata end\n\n');

    if (response.status >= 300) {
      console.error(data);
      res.json({
        status: false,
        error: `An error append when fetching channels in ${user.guild.name} guild`,
      });
      return;
    }

    // filter array got by discord api and add empty option

    const dataFilter = data.filter((el) => el.type === 4);
    const dataEnd = dataFilter.map((el) => ({ name: el.name, value: el.id }));

    // add option of inside no one

    dataEnd.push({ name: 'root', value: '0' });

    res.send(dataEnd);
  } catch (err) {
    console.error(err);

    res.status(500).json({
      status: false,
      error: 'internal get error',
    });
  }
};

module.exports = getCategoryChannels;
