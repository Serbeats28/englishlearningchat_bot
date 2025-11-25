require('dotenv').config()
const express = require('express')
const app = express()
const cookieParser = require('cookie-parser')
// const appConfig = require('./config/app-secret-key.json') 
const cors = require('cors') 
const routes = require('./router/routes')
const PORT = 2800
const apiKey = process.env.APIKEY

app.use(cookieParser())
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(cors())

app.use((req, res, next)=>{
    if(req.header('api-key') !== apiKey && req.path !== '/api/test'){
        return res.json({error_message: "Can't Access ChatBot Api"})
    }

    next()
})

app.use('/api',routes)
app.listen(PORT)

