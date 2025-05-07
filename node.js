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

const PORT = 3000

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`)
});
