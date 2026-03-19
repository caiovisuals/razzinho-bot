import { Client, GatewayIntentBits, Collection } from "discord.js"
import { readdirSync } from "fs"
import { pathToFileURL, fileURLToPath } from "url"
import "dotenv/config"
import { dirname, join } from "path"
import { PREFIX } from "./config/config.js"

const __dirname = dirname(fileURLToPath(import.meta.url))
 
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers,
    ]
})

client.commands = new Collection()
const commandsPath = join(__dirname, "commands")
const commandFiles = readdirSync(commandsPath).filter(f => f.endsWith(".js"))

client.once("ready", () => {
    console.log(`Logado como ${client.user.tag}`)
    console.log(`📌 Prefixo: ${PREFIX}`)
    console.log(`🗂️  ${client.commands.size} comando(s) disponível(is)\n`)
})

client.on("messageCreate", async (message) => {
    if (message.author.bot) return
    if (!message.content.startsWith(PREFIX)) return
 
    const args = message.content.slice(PREFIX.length).trim().split(/\s+/)
    const commandName = args.shift().toLowerCase()
 
    const command = client.commands.get(commandName)
    if (!command) return
 
    try {
        await command.execute(message, args, client)
    } catch (error) {
        console.error(`Erro ao executar ${commandName}:`, error)
        message.reply("❌ Ocorreu um erro ao executar esse comando.")
    }
})

client.login(process.env.DISCORD_TOKEN)