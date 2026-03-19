import { COR_PADRAO } from "../config/config.js"

const frases = [
    { texto: "Se você ama e não é amado, fume maconha e fique lombrado!", autor: "" },
    { texto: "Bigodin finin, cabelin na regúa. Nego ney!", autor: "" },
]

export default {
    name: "frasedodia",
    description: "Envia uma frase motivacional aleatória",
    execute(message) {
        const frase = frases[Math.floor(Math.random() * frases.length)]

        message.reply({
            embeds: [{
                color: COR_PADRAO,
                title: "E a frase do dia é:",
                description: `*"${frase.texto}"*`,
                footer: { text: `— ${frase.autor}` },
                timestamp: new Date().toISOString(),
            }]
        })
    }
}