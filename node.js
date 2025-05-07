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

const id = uuidv4()
const nomeAluno = "Podro Peulo"
const dataHora = new Date().toISOString().replace('T', ' ').slice(0, 19)
const mensagem = `${id} - ${dataHora} - ${nomeAluno}`


writeFile(mensagem)
const PORT = 3000

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`)
});
