import { CommandInteraction, Interaction } from "discord.js";
import { dc } from "../bot";

/**
 * discordjs event to set
 */
export const event = 'interactionCreate';

/**
 * What is executed when event is executed
 * @param interaction Interaction that was created
 */
export const run = (interaction: Interaction) => {
    // If sent by a command
    if (interaction.isCommand()) {
            // Change type
            interaction as CommandInteraction;
            // Run the command
            dc.commands.get(interaction.commandName)?.run(interaction);
        }
    }