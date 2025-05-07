const fs = require('fs')
const { v4: uuidv4 } = require('uuid')  //Nunca vi essa bagaça
const express = require('express')
const app = express()

function writeFile(conteudo) {
    fs.appendFile('logs.txt', conteudo + '\n', (err) => {
        if (err) {
            console.error('erro ao escrever o arquivo', err)
        } else {
            console.log('conteudo registrado com sucesso moreno')
        }
    })
}

app.get('/logs', (req, res) => {
    fs.readFile('logs.txt', 'utf8', (err, data) => {
        if (err) {
            console.error('erro ao ler o arquivo', err)
            return res.status(500).json({ mensagem: 'erro ao ler o arquivo' })
        }

        const logs = data.split('\n').filter(log => log !== '')
        res.json(logs)
    })
})

app.post('/log', (req, res) => { 
    const id = uuidv4()
    const nomeAluno = "Podro Peulo"
    const dataHora = new Date().toISOString().replace('T', ' ').slice(0, 19)
    const mensagem = `${id} - ${dataHora} - ${nomeAluno}`

    if(!nomeAluno) { //so pra verificar se o nome do aluno vai desta forma... nao sei se vai assim
        return res.status(400).json({ mensagem: 'cade o nome do aluno' })
    }

    writeFile(mensagem)

    res.status(201).json({ id, mensagem: 'Log registrado com sucesso!' });
})


const PORT = 3000

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`)
});
