import { COR_PADRAO } from "../config/config.js"

const frases = [
    { texto: "Se você ama e não é amado, fume maconha e fique lombrado!", autor: "" },
]

export default {
    name: "frasedodia",
    description: "Envia uma frase motivacional aleatória",
    execute(message) {
        const frase = frases[Math.floor(Math.random() * frases.length)]

        message.reply({
            embeds: [{
                color: COR_PADRAO,
                title: "✨ Frase do dia",
                description: `*"${frase.texto}"*`,
                footer: { text: `— ${frase.autor}` },
                timestamp: new Date().toISOString(),
            }]
        })
    }
}