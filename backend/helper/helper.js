require('dotenv').config()
const OpenAI = require('openai')
const appConfig = require("../config/app-secret-key.json")

const client = new OpenAI({
    apiKey: appConfig['chatGPTApiKey'] || process.env.CHATGPTAPIKEY
})

const isGreetingMessage = (message) =>{
    const greetings = [ // English
        "hello", "hi", "hey", "good morning", "good afternoon", "good evening", "yo", "sup",

        // Spanish
        "hola", "buenos días", "buenas tardes", "buenas noches",

        // Tagalog / Filipino
        "kamusta", "kumusta", "magandang umaga", "magandang hapon", "magandang gabi",

        // French
        "bonjour", "salut", "bonsoir",

        // German
        "hallo", "guten morgen", "guten tag", "guten abend",

        // Italian
        "ciao", "buongiorno", "buonasera",

        // Japanese
        "konnichiwa", "ohayou", "konbanwa", "moshi moshi",

        // Korean
        "annyeong", "annyeonghaseyo", "yeoboseyo",

        // Chinese (Mandarin)
        "ni hao", "zao shang hao", "wan shang hao",

        // Portuguese
        "olá", "bom dia", "boa tarde", "boa noite",

        // Russian
        "privet", "dobroe utro", "dobry den", "dobry vecher",

        // Arabic
        "as-salamu alaykum", "marhaba", "sabah al-khayr", "masa al-khayr",

        // Hindi
        "namaste", "namaskar", "suprabhat",

        // Swahili
        "jambo", "habari", "shikamoo",

        // Turkish
        "merhaba", "günaydın", "iyi akşamlar"
    ]
    const text = message.toLowerCase()
    return greetings.some(greet => {
        const regex = new RegExp(`\\b${greet}\\b`, "i")
        return regex.test(text)
    })
}

const prepareMessages = (messages) => {
    return messages.map(msg => {
        if (msg.role === "user") {
            const content = msg.content.toLowerCase()
            if (content.includes("correct my sentence") || content.includes("improve my sentence")) {
                return {
                    ...msg,
                    content: "Correct the grammar and improve this sentence: " + msg.content
                }
            }
        }
        return msg
    })
}

const chatBot = async(messages)=>{
    let reply = ""
    let error = ""
    try {
        if (!Array.isArray(messages) || !messages.every(m => m.role && m.content)) throw new Error("I can't help you right now")
        
        const prepared = prepareMessages(messages)
        const response = await client.chat.completions.create({
            model: "gpt-4o-mini", 
            messages: [
                {
                    role: "system",
                    content: `You are an English Learning Chatbot. Your scope is only:
                        1. Teaching English grammar
                        2. Translating phrases to English
                        3. Creating correct English sentences from user input

                        Always correct grammar and improve sentences if the user asks "correct my sentence" or "improve my sentence".
                        Always translate if the user's message is in a foreign language.
                        Do NOT answer anything unrelated to English learning.`
                },
                ...prepared
            ]
        })

        if(response.status == 429) throw new Error("Your quota exceeded. Please try again later.")
        reply = response.choices[0].message.content
    } 
    catch (err) {
        error = err.message
        console.log("chatBot helper", err.message)
    }

    return {error, reply}
}
module.exports = {
    isGreetingMessage,
    chatBot
}