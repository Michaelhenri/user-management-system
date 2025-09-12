import express from 'express'
import pkg from '@prisma/client'
const { PrismaClient } = pkg

const prisma = new PrismaClient()

const app = express()

app.use(express.json()) /*Para o express reconhecer JSON */

/*request, response req: requisição res: resposta */

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
app.get('/users', async (req, res) => {

    const users = await prisma.user.findMany()

    res.status(200).json(users) /*JSON, pois meus usuarios estão criados como JSON */
})

/*Rota Put (atualizar/modificar) */
app.put('/users/:id', async (req, res) => {

    await prisma.user.update({
        where: {
            id: req.params.id
        },
        data: {
            email: req.body.email,
            name: req.body.name,
            age: req.body.age
        }
    })

    res.status(204).json(req.body)
})

/*Rota Delete (deletar) */
app.delete('/users/:id', async (req, res) => {

    await prisma.user.delete({
        where: {
            id: req.params.id
        }
    })

    res.status(200).json({ message: 'Usuário deletado com sucesso!' })

})

app.listen(3000)

/*findMany() e uma função que lista TODOS meus usuários */