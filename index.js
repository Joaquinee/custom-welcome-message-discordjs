const { Client, GatewayIntentBits, ButtonBuilder, ActionRowBuilder, ButtonStyle, EmbedBuilder, ChannelType } = require('discord.js');
const fs = require('fs');
const path = require('path');

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers]
});

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}`);
});

const messagesFilePath = path.join(__dirname, 'messages.json');
const jsonData = JSON.parse(fs.readFileSync(messagesFilePath, 'utf8'));
const messages = jsonData.messages;
const targetChannelId = jsonData.salon;
const TOKEN = jsonData.TOKEN;

client.on('guildMemberAdd', async (member) => {
  const welcomeChannel = member.guild.channels.cache.get(targetChannelId);

  if (!welcomeChannel) {
    console.error(`Salon avec l'ID ${targetChannelId} non trouvé.`);
    return;
  }

  const thread = await welcomeChannel.threads.create({
    name: `Bienvenue ${member.displayName}`,
    type: ChannelType.PrivateThread,

  });

  for (const message of messages) {
    await thread.sendTyping();
    await new Promise(resolve => setTimeout(resolve, message.delay));

    const options = {};

    if (message.buttons) {
        const validStyles = {
            PRIMARY: ButtonStyle.Primary,
            SECONDARY: ButtonStyle.Secondary,
            SUCCESS: ButtonStyle.Success,
            DANGER: ButtonStyle.Danger,
            LINK: ButtonStyle.Link
        };

        const buttons = message.buttons.map(button => {
            const style = validStyles[button.style.toUpperCase()];
            if (!style) throw new Error(`Style de bouton invalide: ${button.style}`);
            
            const emoji = button.emoji ? button.emoji : null;

            const btn  = new ButtonBuilder()
                .setCustomId(button.customId)
                .setLabel(button.label)
                .setStyle(style);
          
            if (emoji) btn.setEmoji(emoji);

            return btn;
                
        });
        const row = new ActionRowBuilder().addComponents(buttons);
        options.components = [row];
    }

    if (message.type === 'text') {
        options.content = message.content.replace('@member', `<@${member.id}>`);

        await thread.send(options);
    } else if (message.type === 'embed') {


        const embed = new EmbedBuilder()
            .setTitle(message.content.title)
            .setDescription(message.content.description)
            .setColor(message.content.color);

        if (message.content.image) embed.setImage(message.content.image);

        options.embeds = [embed];
        await thread.send(options);
    }
}
});

client.on('guildMemberRemove', async (member) => {
    const welcomeChannel = member.guild.channels.cache.get(targetChannelId);

    if (!welcomeChannel) {
        console.error(`Salon avec l'ID ${targetChannelId} non trouvé.`);
        return;
    }
   const searchThread = await welcomeChannel.threads.fetch({
       name: `Bienvenue ${member.displayName}`,
       limit: 1
   });

   if (!searchThread) return;
   await searchThread.threads.first().delete();

});
client.on('interactionCreate', async (interaction) => {
  if (!interaction.isButton()) return;

  if (interaction.customId === 'quest') {
    await interaction.reply({
      content: 'Tu as choisi de découvrir les quêtes !',
      ephemeral: true
    });

  } else if (interaction.customId === 'roles') {
    await interaction.reply({
      content: 'Voici les rôles disponibles...',
      ephemeral: true
    });
  } else if (interaction.customId === 'vocal') {
    await interaction.reply({
      content: 'Bienvenue dans les salons vocaux inédits !',
      ephemeral: true
    });
  }
});

client.login(TOKEN);
