export default {
    name: "say",
    description: "Repete o que você escrever",
    async execute(message) {
        const texto = message.content.slice(PREFIX.length + message.content.slice(PREFIX.length).trim().split(/\s+/)[0].length).trim()

        const attachments = Array.from(message.attachments.values())

        const imagens = attachments.filter(att =>
            att.url.match(/\.(png|jpg|jpeg|gif|webp)$/i)
        )

        if (!texto && imagens.length === 0) {
            return message.reply({
                embeds: [{
                    color: 0xff4444,
                    description: "❌ Escreva algo ou envie uma imagem depois do comando! Ex: `!rsay Olá Mundo`"
                }]
            })
        }

        await message.delete().catch(() => {})

        if (imagens.length > 0) {
            return message.channel.send({
                content: texto
                    ? `${texto}\n${imagens[0].url}`
                    : imagens[0].url
            })
        }

        message.channel.send({
            content: texto || null
        })
    }
}