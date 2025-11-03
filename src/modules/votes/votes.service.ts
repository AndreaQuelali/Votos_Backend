import { Op } from "sequelize";
import { IServiceResponse } from "../../types";
import { ICreateVote } from "./dtos/createVote.dto";
import { IUpdateVote } from "./dtos/updateVote.dto";
import { IVote, IVoteFilter } from "./interfaces/vote.interface";
import Vote from "./models/vote.model";

export const postVotesService = async (payload: ICreateVote): Promise<IServiceResponse<IVote | null>> => {
    try {
   const vote = await Vote.create(payload); 
    return {
        message: "Voto creado exitosamente",
        ok: true,
        data: vote.dataValues
    };
    } catch (error) {
        return {
            message: "Error al crear el voto",
            ok: false,
            data: null
        };
    }
}
    
export const getVotesService = async (filter:IVoteFilter): Promise<IServiceResponse<Vote[]>> => {
    try {
        const whereConditions: any = {};
        if(filter.name){
            whereConditions.name = {
                [Op.iLike]: `%${filter.name}%`
            }
        }
        if(filter.status !== undefined){
            whereConditions.status = filter.status;
        }

        if (filter.startAt || filter.endAt) {
            const dateFilter: any = {};
            
            if (filter.startAt) {
              dateFilter[Op.gte] = filter.startAt;
            }
            
            if (filter.endAt) {
              dateFilter[Op.lte] = filter.endAt;
            }
            
            whereConditions.date = dateFilter;
          }
        
        const votes = await Vote.findAll({
            where: whereConditions,
            order: [['createdAt', 'DESC']],
            limit: 100
        });
        return {
            message: "Votos obtenidos exitosamente",
            ok: true,
            data: votes
        };
    } catch (error) {
        return {
            message: "Error al obtener los votos",
            ok: false,
            data: null
        };
    }
}

export const getVoteByIdService = async (id: number): Promise<IServiceResponse<Vote>> => {
    try {
        const vote = await Vote.findByPk(id);
        if(!vote){
            return {
                message: "Voto no encontrado",
                ok: false,
                data: null
            };
        }
        return {
            message: "Voto obtenido exitosamente",
            ok: true,
            data: vote
        };
    } catch (error) {
        return {
            message: "Error al obtener el voto",
            ok: false,
            data: null
        };
    }
}

export const updateVoteService = async (id: number, payload: IUpdateVote): Promise<IServiceResponse<Vote>> => {
    try {
        const vote = await Vote.findByPk(id);
        if(!vote){
            return {
                message: "Voto no encontrado",
                ok: false,
                data: null
            };
        }
        await vote.update(payload);
        return {
            message: "Voto actualizado exitosamente",
            ok: true,
            data: vote
        };
    } catch (error) {
        return {
            message: "Error al actualizar el voto",
            ok: false,
            data: null
        };
    }
}

export const deleteVoteService = async (id: number): Promise<IServiceResponse<Vote>> => {
    try {
        const vote = await Vote.findByPk(id);
        if(!vote){
            return {
                message: "Voto no encontrado",
                ok: false,
                data: null
            };
        }
        await vote.destroy();
        return {
            message: "Voto eliminado exitosamente",
            ok: true,
            data: vote
        };
    } catch (error) {
        return {
            message: "Error al eliminar el voto",
            ok: false,
            data: null
        };
    }
}
