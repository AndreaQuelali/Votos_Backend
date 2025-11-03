import { Request, Response } from "express";
import { deleteVoteService, getVoteByIdService, getVotesService, postVotesService, updateVoteService } from "./votes.service";
import { IVoteFilter } from "./interfaces/vote.interface";

export const postVoteController = async (req: Request, res: Response) => {
    try {
    const data = req.body;

    const result = await postVotesService(data);
    if (!result.ok) {
        res.status(400).send({message: result.message, status: 400, ok: false});
        return;
    }
    res.status(201).send({message: result.message, status: 201, ok: true, data: result.data});
    } catch (error) {
        res.status(500).send({message: 'Error al registrar el voto', status: 500, ok: false});
    }
}

export const getVoteController = async (req: Request, res: Response) => {
    try {
        const query = req.query; // or req.body
        const filter: IVoteFilter = {};
    
    // Sanitizar y validar name
    if (query.name && typeof query.name === 'string') {
      const sanitizedName = query.name.trim();
      if (sanitizedName.length > 0 && sanitizedName.length <= 255) {
        filter.name = sanitizedName;
      }
    }
    
    // Validar y parsear fechas
    if (query.startAt && typeof query.startAt === 'string') {
      const startDate = new Date(query.startAt);
      if (!isNaN(startDate.getTime())) {
        filter.startAt = startDate;
      }
    }
    
    if (query.endAt && typeof query.endAt === 'string') {
      const endDate = new Date(query.endAt);
      if (!isNaN(endDate.getTime())) {
        filter.endAt = endDate;
      }
    }

    // Sanitizar y validar status
    if (query.status !== undefined) {
        if (query.status === 'true') {
          filter.status = true;
        } else if (query.status === 'false') {
          filter.status = false;
        }
      }

    const result = await getVotesService(filter);
    if (!result.ok) {
        res.status(400).send({message: result.message, status: 400, ok: false});
        return;
    }
    res.status(200).send({message: result.message, status: 200, ok: true, data: result.data});
    } catch (error) {
        res.status(500).send({message: 'Error al obtener los votos', status: 500, ok: false});
    }
}

export const getVoteIdController = async (req: Request, res: Response) => {
    try {
    const id = req.params.id
    const result = await getVoteByIdService(Number(id));
    if (!result.ok) {
        res.status(400).send({message: result.message, status: 400, ok: false});
        return;
    }
    res.status(200).send({message: result.message, status: 200, ok: true, data: result.data});
    } catch (error) {
        res.status(500).send({message: 'Error al obtener el voto', status: 500, ok: false});
    }
}

export const putVoteController = async (req: Request, res: Response) => {
    try {
        const data = req.body; 
        const id = req.body.id; 
        const result = await updateVoteService(Number(id), data);
        if (!result.ok) {
            res.status(400).send({message: result.message, status: 400, ok: false});
            return;
        }
        res.status(200).send({message: result.message, status: 200, ok: true, data: result.data});
    } catch (error) {
        res.status(500).send({message: 'Error al actualizar el voto', status: 500, ok: false});
    }   
}
    
export const patchVotePartialController = async (req: Request, res: Response) => {
    try {
    const data = req.body; 
    const id = req.params.id; 
    const result = await updateVoteService(Number(id), data);
    if (!result.ok) {
        res.status(400).send({message: result.message, status: 400, ok: false});
        return;
    }
    res.status(200).send({message: result.message, status: 200, ok: true, data: result.data});
    } catch (error) {
        res.status(500).send({message: 'Error al actualizar el voto', status: 500, ok: false});
    }
}

export const deleteVoteController = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const result = await deleteVoteService(Number(id));
        if (!result.ok) {
            res.status(400).send({message: result.message, status: 400, ok: false});
            return;
        }
       
       res.status(200).send({message: result.message, status: 200, ok: true, data: result.data});
    } catch (error) {
        res.status(500).send({message: 'Error al eliminar el voto', status: 500, ok: false});
    }
}
