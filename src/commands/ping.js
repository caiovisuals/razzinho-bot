import { COR_PADRAO } from "../config/config.js"

export default {
    name: "ping",
    description: "Mostra a latência do bot",
    async execute(message, args, client) {
        const sent = await message.reply("🏓 Calculando...")
        const latency = sent.createdTimestamp - message.createdTimestamp
        const apiLatency = Math.round(client.ws.ping)

        sent.edit({
            content: "",
            embeds: [{
                color: COR_PADRAO,
                title: "🏓 Pong!",
                fields: [
                    { name: "📡 Latência do bot", value: `\`${latency}ms\``, inline: true },
                    { name: "💙 API do Discord", value: `\`${apiLatency}ms\``, inline: true },
                ]
            }]
        })
    }
}