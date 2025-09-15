import express from 'express'
import cors from 'cors'
import pkg from '@prisma/client'
const { PrismaClient } = pkg

const prisma = new PrismaClient()

const app = express()

app.use(express.json()) // Para o express reconhecer JSON
app.use(cors()) //libera o acesso para o front

//request, response req: requisição res: resposta

//Rota Post (criar)
app.post('/users', async (req, res) => {
    try {
        const user = await prisma.user.create({
            data: {
                name: req.body.name,
                age: Number(req.body.age),
                email: req.body.email,
            },
        });
        res.status(201).json(user);
    } catch (error) {
        if (error.code === 'P2002') {
            // Código de erro P2002 é para campos únicos
            return res.status(409).json({ message: 'Este e-mail já está cadastrado.' });
        }
        // Caso seja outro tipo de erro, retorna uma mensagem genérica
        res.status(500).json({ message: 'Ocorreu um erro no servidor.' });
    }
});

//Rota Get (listar)
app.get('/users', async (req, res) => {

    const users = await prisma.user.findMany()

    res.status(200).json(users) //JSON, pois meus usuarios estão criados como JSON
})

// Rota Put (atualizar/modificar)
app.put('/users/:id', async (req, res) => {
    const { id } = req.params;
    const { name, age, email } = req.body;

    try {
        const user = await prisma.user.update({
            where: {
                id: id,
            },
            data: {
                name: name,
                age: Number(age),
                email: email,
            },
        });
        return res.status(200).json(user);
    } catch (error) {
        if (error.code === 'P2025') {
            return res.status(404).json({ message: 'Usuário não encontrado.' });
        }
        if (error.code === 'P2002') {
            return res.status(409).json({ message: 'Este e-mail já está cadastrado.' });
        }
        console.log(error);
        return res.status(500).json({ message: 'Ocorreu um erro no servidor.' });
    }
});

//Rota Delete (deletar)
app.delete('/users/:id', async (req, res) => {

    await prisma.user.delete({
        where: {
            id: req.params.id,
        },
    })

    res.status(200).json({ message: 'Usuário deletado com sucesso!' })

})

app.listen(3000)