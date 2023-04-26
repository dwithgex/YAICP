// import SlashCommandBuilder, EmbedBuilder, and ImageAI classes
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { ImageManager } = require('../utils/model-managers.js');

// create an instance of the ImageAI class
const image = new ImageManager();

// export an object with the data and execute properties
module.exports = {
    // data object for the command
    data: new SlashCommandBuilder()
	    .setName('imagine') // name of the command
	    .setDescription('Send image generated by YAICP Artificial Intelligence!') // description of the command
	    .addStringOption(option => // string option for the command
		    option.setName('prompt') // name of the option
			    .setDescription('The prompt to generate the image from') // description of the option
			    .setRequired(true)), // option as required

    // execute function for the command
    async execute(interaction) {
        // defer the reply so that it can be edited later
        await interaction.deferReply();
        // get the 'prompt' option from the interaction object
        const input = interaction.options.getString('prompt');
        // generate an image from the prompt
        const output = await image.generate_image(input);
        // edit the reply with the embed of the generated image
        await interaction.editReply({ embeds: [this.embedImage(input, output)] });
        console.log('Image sent!');
    },

    // function to create an embed object with the generated image
    embedImage(title, url) {
        return new EmbedBuilder()
        .setColor(0x19C37D) // color of the embed
        .setTitle(title.toUpperCase()) // title of the embed
        .setAuthor({ // author of the embed
          name: 'ElixzeAI',
          iconURL: 'https://cdn.discordapp.com/attachments/923942428497567795/1100887225106976848/logo_on_discord_Elixze_black.png',
          url: 'https://withgex.wixsite.com/tools/yaicp'
        }) 
        .setImage(url) // image of the embed
        .setFooter({ text: 'Image generated by YAICP Artificial Intelligence'}); // set the footer of the embed
    }
};
