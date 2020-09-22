import express from 'express'
import CreatePointsControllers from './controllers/PointsControllers';

const routes = express.Router();

const createPointsController = new CreatePointsControllers();

routes.post('/savepoint', createPointsController.create);

//     //req.body: O corpo do formulário
//     const query = `
//          INSERT INTO place (
//              image,
//              name,
//              address,
//              address2,
//              state,
//              city,
//              items
//          ) VALUES (?, ?, ?, ?, ?, ?, ?);    
//      `;
//     const values = [
//         req.body[1],
//         req.body.name,
//         req.body.address,
//         req.body.address1,
//         req.body.state,
//         req.body.city,
//         req.body.item,
//         console.log("meu pau de asa:-  " + req.body.item)

//     ];

//     function afterInsertData(err) {
//         if (err) {
//             res.send("Erro no cadastro");
//             return console.log(err);

//         } else {
//             console.log("cadastrado com sucesso");
//             console.log(this);
//         }

//         return res.render("create-point.html", { saved: true })
//     }

//     db.run(query, values, afterInsertData);

// });
// routes.get("/search", (req, res) => {})
		
export default routes;