export default {
    name: "say",
    description: "Repete o que você escrever",
    async execute(message, args) {
        const texto = args.join(" ")

        const attachments = Array.from(message.attachments.values())

        const imagens = attachments.filter(att => att.contentType?.startsWith("image"))

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
                content: texto || undefined,
                embeds: [{
                    image: {
                        url: imagens[0].url
                    }
                }]
            })
        }

        message.channel.send({
            content: texto || null
        })
    }
}