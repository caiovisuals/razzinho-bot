import { COR_PADRAO, PREFIX } from "../config/config.js"

export default {
    name: "help",
    description: "Lista todos os comandos disponíveis",
    execute(message, args, client) {
        const comandos = [...client.commands.values()]

        const lista = comandos.map(c => `\`${PREFIX}${c.name}\` — ${c.description}`).join("\n")

        message.reply({
            embeds: [{
                color: COR_PADRAO,
                title: "📋 Comandos disponíveis",
                description: lista,
                footer: { text: `Razzinho Bot • use ${PREFIX}<comando>` },
            }]
        })
    }
}