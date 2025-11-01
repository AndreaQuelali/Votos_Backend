import { Request, Response } from "express";
import { getVotesService } from "./votes.service";

//mock database
let votes= [{
    id: 1,
    name: "Votos nulos",
    date: "2025-10-31",
    count: 50,
    finished: true,
},
{
    id: 2,
    name: "Votos validos",
    date: "2025-10-31",
    count: 150,
    finished: true,
},{
    id: 3,
    name: "Votos en blanco",
    date: "2025-10-31",
    count: 30,
    finished: true,
}
];

export const postVoteController = (req: Request, res: Response) => {
    try {
    const data = req.body;

    const result = getVotesService(data);
    if (!result.ok) {
        res.status(400).send({message: result.message, status: 400, ok: false});
        return;
    }
    res.status(201).send({message: result.message, status: 201, ok: true, data: result.data});
    } catch (error) {
        res.status(500).send({message: 'Error al registrar el voto', status: 500, ok: false});
    }
}

export const getVoteController = (req: Request, res: Response) => {
    res.status(200).send({message: 'Votos obtenidos', status: 200, ok: true, data: votes});
}

export const getVoteIdController = (req: Request, res: Response) => {
    try {
    const id = req.params.id
    const vote = votes.find(vote => vote.id === Number(id))

    if (!vote) {
        res.status(404).send({message: 'Voto no encontrado', status: 404, ok: false});
        return;
    }
    res.status(200).send({message: 'Voto obtenido', status: 200, ok: true, data: vote});
    } catch (error) {
        res.status(500).send({message: 'Error al obtener el voto', status: 500, ok: false});
    }
}

export const putVoteController = (req: Request, res: Response) => {
    try {
        const data = req.body; 
        const id = req.body.id; // en el body recibe el id
        const vote = votes.find(vote => vote.id === Number(id));
        if (!vote) {
            res.status(404).send({message: 'Voto no encontrado', status: 404, ok: false});
            return;
        }
        vote.name = data.name;
        vote.date = data.date;
        vote.count = data.count;
        vote.finished = data.finished;  

        votes.map(vote => {if (vote.id === Number(id)) {vote.name = data.name; vote.date = data.date; vote.count = data.count; vote.finished = data.finished;}});
        res.status(200).send({message: 'Voto actualizado', status: 200, ok: true, data: vote});
    } catch (error) {
        res.status(500).send({message: 'Error al actualizar el voto', status: 500, ok: false});
    }   
}
    
export const patchVotePartialController = (req: Request, res: Response) => {
    try {
    const data = req.body; 
    const id = req.params.id; // en la ruta recibe el id
    const vote = votes.find(vote => vote.id === Number(id));
    if (!vote) {
        res.status(404).send({message: 'Voto no encontrado', status: 404, ok: false});
        return;
    }   
    //segun las reglas del negocio que se quiere actualizar
    vote.date = data.date;
    vote.count = data.count;
    vote.finished = data.finished;

    votes.map(vote => {if (vote.id === Number(id)) {vote.date = data.date; vote.count = data.count; vote.finished = data.finished;}});
    res.status(200).send({message: 'Voto actualizado', status: 200, ok: true, data: vote});
    } catch (error) {
        res.status(500).send({message: 'Error al actualizar el voto', status: 500, ok: false});
    }
}

export const deleteVoteController = (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const voteIndex = votes.findIndex(vote => vote.id === Number(id));
        if (voteIndex === -1) {
            res.status(404).send({message: 'Voto no encontrado', status: 404, ok: false});
            return;
        }
        const deletedVote = votes[voteIndex];

       const newVotes = votes.filter(vote => vote.id !== Number(id));
       votes = newVotes;
       
       res.status(200).send({message: 'Voto eliminado', status: 200, ok: true, data: deletedVote});
    } catch (error) {
        res.status(500).send({message: 'Error al eliminar el voto', status: 500, ok: false});
    }
}
