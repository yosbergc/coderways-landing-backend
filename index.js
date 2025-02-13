import express from 'express'
import { validateEmail } from './consts/consts'
const app = express()

app.use(express.json())
app.use()

app.get('/', (req, res) => {
    res.send('Hello world')
})

app.post('/', (req, res) => {
    const { email } = req.body
    if (!email) {
        return res.send('Necesitamos un correo para poder agregarte a nuestra lista de espera.')
    }

    const isValid = validateEmail(email)

    if (!isValid) {
        return res.send('Necesitamos un correo valido.')
    }

    
})