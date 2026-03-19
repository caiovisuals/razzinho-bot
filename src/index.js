import { Client, GatewayIntentBits } from "discord.js"
import "dotenv/config"

const client = new Client({
    intents: [GatewayIntentBits.Guilds]
})

client.once("ready", () => {
    console.log(`Logado como ${client.user.tag}`)
})

client.login(process.env.DISCORD_TOKEN)