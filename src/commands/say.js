export default {
    name: "say",
    description: "Repete o que você escrever",
    async execute(message, args) {
        const texto = args.join(" ")

        const attachments = message.attachments.map(att => att.url)

        if (!texto && attachments.length === 0) {
            return message.reply({
                embeds: [{
                    color: 0xff4444,
                    description: "❌ Escreva algo ou envie uma imagem depois do comando! Ex: `!rsay Olá Mundo`"
                }]
            })
        }

        await message.delete().catch(() => {})

        if (attachments.length > 0) {
            return message.channel.send({
                content: texto || null,
                embeds: [{
                    image: {
                        url: attachments[0]
                    }
                }]
            })
        }

        message.channel.send({
            content: texto || null
        })
    }
}