const express = require("express");
const server = express();

// pegar o banco de dados
const db = require("./database/db.js");

// configurar pasta publica

server.use(express.static("public"));

//Habilitar o uso do req.body na nossa aplicação

server.use(express.urlencoded({ extends: true }));
const nunjucks = require("nunjucks");
nunjucks.configure("src/views", {
    express: server,
    noCache: true
});
// configurar caminhos da minha aplicação

//pagina inicial
// req: requisição, logo, um pedido.
// res: resposta.

    //listen tem uma função para alocar o servidor em uma porta, provavelmente...
server.listen(3000)