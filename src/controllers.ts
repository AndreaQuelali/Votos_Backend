import { Request, Response } from "express";

const postVoteController = (req: Request, res: Response) => {
    const data = req.body;

    if (data.count < 50) {
     res.status(400).send({message: 'Votos insuficientes', status: 400, ok: false});   
     return;
    }
    if (data.count >= 50) {
    res.status(201).send({message: 'Votos registrados', status: 201, ok: true}); return;
    } 
}

export default postVoteController;