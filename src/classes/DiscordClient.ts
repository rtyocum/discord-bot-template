import { Client, ClientOptions } from "discord.js";
import { SlashCommandBuilder } from '@discordjs/builders'

/**
 * Client class with commands map
 */
class DiscordClient extends Client {
    // Lost of commands
    public commands: Map<string, { data: SlashCommandBuilder, run: Function }>
    constructor(options: ClientOptions) {
        super(options);
        // Initialize Map
        this.commands = new Map();
    }
}

export default DiscordClient;