//importar a sua dependência

const sqlite3 = require("sqlite3").verbose();

// criar o objeto de banco de dados
const db = new sqlite3.Database("./src/database/database.db");

module.exports = db;