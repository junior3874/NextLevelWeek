import {Response, Request} from 'express';
import db from '../database/connection';


export default class CreatePointsControllers{



    // async index (req: Request, res: Response){
    //     const filters = req.query;
    //         const {..filters} as string;

    // }
    
		async index(req: Request, res: Response){
			
      const { state, city } = req.body;
      
      const points = await db('points')
        .where({ state, city }).select('*');
        return res.json(points);
        
    }
      
    async create(req: Request, res: Response){
        
        const {image,name,adress,adress2,state,city,items} = req.body;
				const trx = await db.transaction();
				
				try{
					await trx('points').insert({image,name,adress,adress2,state,city,items});
					await trx.commit();
					return res.status(201).send();
				}catch(err){
					console.log(err);
				}
    }

    // const query = `
    //      INSERT INTO place (
    //          image,
    //          name,
    //          address,
    //          address2,
    //          state,
    //          city,
    //          items
    //      ) VALUES (?, ?, ?, ?, ?, ?, ?);    
    //  `;
    // const values = [
    //     req.body[1],
    //     req.body.name,
    //     req.body.address,
    //     req.body.address1,
    //     req.body.state,
    //     req.body.city,
    //     req.body.item,
    //     console.log("meu pau de asa:-  " + req.body.item)

    // ];

    // function afterInsertData(err) {
    //     if (err) {
    //         res.send("Erro no cadastro");
    //         return console.log(err);

    //     } else {
    //         console.log("cadastrado com sucesso");
    //         console.log(this);
    //     }

    //     return res.render("create-point.html", { saved: true })
    // }

    // db.run(query, values, afterInsertData);

}
