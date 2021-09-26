import { SlashCommandBuilder } from '@discordjs/builders';
import { CommandInteraction } from 'discord.js';

/**
 * Creates the intereaction to send to discord
 */
export const data = new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Returns Pong')

/**
 * what is run when command is executed
 * @param interaction Interaction that was created
 */
export const run = (interaction: CommandInteraction) => {
    // Reply with Pong only visible to the user
    interaction.reply({ content: 'Pong', ephemeral: true })
}