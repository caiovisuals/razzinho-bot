import { COR_PADRAO } from "../config/config.js"

export default {
    name: "sorteio",
    description: "Sorteia um membro aleatório do servidor",
    async execute(message, args, client) {
        await message.guild.members.fetch()

        const membros = message.guild.members.cache.filter(m => !m.user.bot)

        if (membros.size === 0) {
            return message.reply("❌ Nenhum membro encontrado no servidor!")
        }

        const array = [...membros.values()]
        const sorteado = array[Math.floor(Math.random() * array.length)]

        message.reply({
            embeds: [{
                color: COR_PADRAO,
                title: "🎉 Sorteio realizado!",
                description: `O sortudo é: **${sorteado.user.username}** 🎊`,
                thumbnail: { url: sorteado.user.displayAvatarURL() },
                footer: { text: `Sorteado por ${message.author.username}` },
                timestamp: new Date().toISOString(),
            }]
        })
    }
}