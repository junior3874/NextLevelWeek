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
server.get("/", (req, res) => {
    return res.render("index.html");

});
server.get("/create-point", (req, res) => {
    // req.query: Query Strings da nossa URL


    return res.render("create-point.html");

});
server.post("/savepoint", (req, res) => {

    //req.body: O corpo do formulário
    const query = `
         INSERT INTO place (
             image,
             name,
             address,
             address2,
             state,
             city,
             items
         ) VALUES (?, ?, ?, ?, ?, ?, ?);    
     `;
    const values = [
        req.body[1],
        req.body.name,
        req.body.address,
        req.body.address1,
        req.body.state,
        req.body.city,
        req.body.item,
        console.log("meu pau de asa:-  " + req.body.item)

    ];

    function afterInsertData(err) {
        if (err) {
            res.send("Erro no cadastro");
            return console.log(err);

        } else {
            console.log("cadastrado com sucesso");
            console.log(this);
        }

        return res.render("create-point.html", { saved: true })
    }

    db.run(query, values, afterInsertData);

});
server.get("/search", (req, res) => {

        const search = req.query.search;
        if (search == "") {
            res.render("search-results.html", { total: 0 })
        } else {
            db.all(`SELECT * FROM place WHERE city LIKE '%${search}%'`, function(err, rows) {
                if (err) {
                    return console.log(err)
                } else {
                    console.log("Aqui estão seus registros");
                    console.log(rows);
                    // mostrar a página HTML com os dados do DB

                    const total = rows.length;
                    console.log("...." + rows.item);

                    return res.render("search-results.html", { place: rows, total });
                }
            })

        }


    })
    //listen tem uma função para alocar o servidor em uma porta, provavelmente...
server.listen(3000)