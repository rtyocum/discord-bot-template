import { config } from 'dotenv';
import DiscordClient from "./classes/DiscordClient";
import { registerCommands, registerEvents } from "./utils/registry";

// Initializes dotenv
// Environment Vars:

// BOT_TOKEN = your token
// CLIENT_ID = your bot's client id
config()

// Initializes Discord Client with all intents
// Here is the list of intents
// https://discord.com/developers/docs/topics/gateway#list-of-intents
export const dc = new DiscordClient({intents: 32767});

// Registers Commands
// Any ts file inside of the commands folder will be read as a command
// Required exports:

// data = class SlashCommandBuilder, interaction to be registered on load
// run = function when command is sent: Returns null

registerCommands();

// Registers Events
// Any ts file inside of the events folder will be read as an event
// Required exports:

// event = string name of events
// run = function when event is sent: Returns null
registerEvents();


// Logs bot in
dc.login(process.env['BOT_TOKEN']);