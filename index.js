import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { validateEmail } from './consts/consts.js'
import { addEmail } from './models/mysql.js'
const app = express()
const PORT = process.env.PORT || 5000;
dotenv.config()
app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
    res.send('Hello world')
})
app.post('/', async (req, res) => {
    const { email } = req.body
    if (!email) {
        return res.status(400).send('Necesitamos un correo para poder agregarte a nuestra lista de espera.')
    }

    const isValid = validateEmail(email)

    if (!isValid) {
        return res.status(400).send('Necesitamos un correo valido.')
    }

    try {
        await addEmail(email)
        res.json({
            status: 'Has sido añadido a nuestra lista de espera.'
        })
    } catch(error) {
        res.status(400).send('Encontramos un error, trata de nuevo más tarde.')
    }
})

app.listen(PORT)