
const express = require('express')
const router = express.Router()
const {isGreetingMessage, isEnglishLearning, chatBot} = require('../helper/helper')

router.get('/test', (req, res)=>{
    res.json({message: "hello world"})
})

router.post('/chat', async (req, res)=>{
    let error_message = ""
    let reply
    let params = req.body.messages

    try {
        if(isGreetingMessage(params[0].content)) {
            return res.json(
            {
                error_message: error_message, 
                reply: 'Hello! How can I help you learn today?'
            })
        }

        const response = await chatBot(params)

        if (response.error) {
            error_message = response.error
            reply = "Sorry, something went wrong with the chatbot."
        } else {
            reply = response.reply || "Sorry! I can only help with English grammar, translation, or sentence creation."
        }

        return res.json({ error_message, reply })
    } 
    catch (err) {
        error_message = err.message
        return res.json({error_message:err.message, reply})
    }
})
module.exports = router