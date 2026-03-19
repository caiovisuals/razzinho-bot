import { Client, GatewayIntentBits, Collection } from "discord.js"
import { readdirSync } from "fs"
import { pathToFileURL, fileURLToPath } from "url"
import { dirname, join } from "path"
import { PREFIX } from "./config/config.js"
import "dotenv/config"

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

for (const file of commandFiles) {
    const filePath = pathToFileURL(join(commandsPath, file)).href
    const command = await import(filePath)
    client.commands.set(command.default.name, command.default)
}

client.once("ready", () => {
    client.user.setPresence({
        status: "idle",
        activities: [
            {
                name: "real trap meu manos!+++ 😎",
                type: 2,
            }
        ]
    })

    console.log(`Logado como ${client.user.tag}`)
    console.log(`📌 Prefixo: ${PREFIX}`)
    console.log(`🗂️ ${client.commands.size} comandos disponíveis\n`)
})

client.on("messageCreate", async (message) => {
    if (message.author.bot) return
    if (!message.content.startsWith(PREFIX)) return

    const contentLower = message.content.toLowerCase()
    if (!contentLower.startsWith(PREFIX.toLowerCase())) return
 
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