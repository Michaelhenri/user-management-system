import express from 'express'

const app = express()

app.use(express.json()) /*Para o express reconhecer JSON */

/*request, response req: requisição res: resposta */

const users = []

/*Rota Post (criar) */
app.post('/users', (req, res) => {

    users.push(req.body)

    res.status(201).json(req.body)
})

/*Rota Get (listar)*/
app.get('/users', (req, res) => {

    res.status(200).json(users) /*JSON, pois meus usuarios estão criados como JSON */

})

app.listen(3000)

/*Metodo "send" serve para enviar a resposta de volta para o cliente */