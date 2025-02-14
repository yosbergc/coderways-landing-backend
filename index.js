import express from 'express'
import { validateEmail } from './consts/consts'
import { addEmail } from './models/mysql'
const app = express()

app.use(express.json())
app.use()

app.get('/', (req, res) => {
    res.send('Hello world')
})

app.post('/', async (req, res) => {
    const { email } = req.body
    if (!email) {
        return res.send('Necesitamos un correo para poder agregarte a nuestra lista de espera.')
    }

    const isValid = validateEmail(email)

    if (!isValid) {
        return res.send('Necesitamos un correo valido.')
    }

    try {
        await addEmail(email)
        res.json({
            status: 'Has sido añadido a nuestra lista de espera.'
        })
    } catch(error) {
        res.send('Encontramos un error, trata de nuevo más tarde.')
    }
})