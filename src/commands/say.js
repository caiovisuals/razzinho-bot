import { COR_PADRAO } from "../config/config.js"

export default {
    name: "say",
    description: "Repete o que você escrever",
    async execute(message, args) {
        const texto = args.join(" ")

        if (!texto) {
            return message.reply({
                embeds: [{
                    color: 0xff4444,
                    description: "❌ Escreve algo depois do comando! Ex: `!rsay olá mundo`"
                }]
            })
        }

        await message.delete().catch(() => {})

        message.channel.send({
            embeds: [{
                color: COR_PADRAO,
                description: `💬 ${texto}`,
                footer: { text: `Pedido por ${message.author.username}` }
            }]
        })
    }
}