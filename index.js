import express from 'express'
import cors from 'cors'
import { validateEmail } from './consts/consts.js'
import { addEmail } from './models/mysql.js'
const app = express()
const PORT = process.env.PORT || 5000;
app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
    res.send('Hello world')
})

app.post('/', async (req, res) => {
    const { email } = req.body
    const authorization = req.get('authorization')
    if (!authorization || authorization !== process.env.SECRET_PHRASE) {
        return res.send('No estás autenticado para poder realizar esta solicitud.')
    }
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

app.listen(PORT)