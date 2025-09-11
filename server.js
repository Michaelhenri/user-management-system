import express from 'express'
import pkg from '@prisma/client'
const { PrismaClient } = pkg

const prisma = new PrismaClient()

const app = express()

app.use(express.json()) /*Para o express reconhecer JSON */

/*request, response req: requisição res: resposta */

const users = []

/*Rota Post (criar) */
app.post('/users', async (req, res) => {

    await prisma.user.create({
        data: {
            email: req.body.email,
            name: req.body.name,
            age: req.body.age
        }
    })

    res.status(201).json(req.body)
})

/*Rota Get (listar)*/
app.get('/users', (req, res) => {

    res.status(200).json(users) /*JSON, pois meus usuarios estão criados como JSON */

})

app.listen(3000)

/*Metodo "send" serve para enviar a resposta de volta para o cliente */