import { REST, Routes } from 'discord.js';
import { readdir, lstat } from 'fs/promises';
import { join } from 'path';
import { dc } from '../bot';

// Initializes array for registering interactions
const commandsInit: string[] = [];

/**
 * Recursive function for building the commands into the list and map
 * @param path full path to search through
 */
const buildCommands = async (path = join(__dirname, '..', 'commands')) => {
    // Read base command directory
    const commandFiles = await readdir(path);
    // For each file in the directory
    for (const file of commandFiles) {
        // Get the stat of the file
        const stat = await lstat(join(path, file));

        if (stat.isDirectory()) {
            // If file is a directory, recurse into that directory
            await buildCommands(join(path, file));
            // Checks for js file
        } else if (file.endsWith('.js')) {
            // Imports command
            const commandModule = require(join(path, file));
            // Adds the command data to commands Init for registering
            commandsInit.push(commandModule.data.toJSON());
            // Sets command into global map
            dc.commands.set(commandModule.data.name, commandModule);
        }
    }
};

/**
 * Registers the commands as interactions in discord api
 */
export const registerCommands = async () => {
    // Build the command array
    await buildCommands();

    // Create a rest object and set the token
    const rest = new REST({ version: '10' }).setToken(
        typeof process.env['BOT_TOKEN'] == 'string'
            ? process.env['BOT_TOKEN']
            : ''
    );

    try {
        console.log('Refreshing slash commands...');
        // Add the commands using commandsInit array
        await rest.put(
            Routes.applicationGuildCommands(
                typeof process.env['CLIENT_ID'] === 'string'
                    ? process.env['CLIENT_ID']
                    : '',
                typeof process.env['GUILD_ID'] === 'string'
                    ? process.env['GUILD_ID']
                    : ''
            ),
            {
                body: commandsInit,
            }
        );
    } catch (err) {
        // Catch error
        console.error(err);
    }
};

/**
 * Registers all of the events in the event folder
 * @param path full path to search through
 */
export const registerEvents = async (
    path = join(__dirname, '..', 'events')
) => {
    // Get all files in directory
    const eventFiles = await readdir(path);
    // For all files in the directory
    for (const file of eventFiles) {
        // Get stat on the files
        const stat = await lstat(join(path, file));

        if (stat.isDirectory()) {
            // If a directory, recurse in that directory
            await registerEvents(join(path, file));
            // Check if it is a js file
        } else if (file.endsWith('.js')) {
            // Import file
            const eventModule = require(join(path, file));
            // Set event
            dc.on(eventModule.event, eventModule.run);
        }
    }
};
