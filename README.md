# Discord Bot Template

Built on Discord.js and uses the new interaction commands

## Setup

Clone the repo
`git@github.com:rtyocum/discord-bot-template.git`
Make sure you have the typescript compiler installed
`npm install -g typescript`
Install dependencies
`npm install`
Create .env file formatted as such:

    BOT_TOKEN=<your token here>
    CLIENT_ID=<your client id here>

Running the bot:
`tsc` to compile
`npm start` for production
`npm test` uses nodemon to scan for changes

## Adding commands

Command files are put anywhere in the commands directory
They must export both data and a run function
e.g.

    import { SlashCommandBuilder } from '@discordjs/builders';
    import { CommandInteraction } from 'discord.js';

    export const data = new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Returns Pong')

    export const run = (interaction: CommandInteraction) => {

    // Reply with Pong only visible to the user

    interaction.reply({ content: 'Pong', ephemeral: true })

    }

This example creates a ping command that returns pong to the user

## Adding Events

Event files are put in the event directory
They must export a discordjs event name string 'event' and a run function
e.g

    import { CommandInteraction, Interaction } from  "discord.js";
    import { dc } from "../bot";

    export const event = 'message';

    export const run = (message: Message) => {
        message.channel.send('Pong');
    }

This event sends Pong anytime anyone sends a message.
