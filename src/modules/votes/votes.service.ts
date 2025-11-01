import { IServiceResponse } from "../../types";
import { ICreateVote } from "./dtos/createVote.dto";
import { IVote } from "./interfaces/vote.interface";

//mock database
let votes: IVote[] = [{
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


export const getVotesService = (payload: ICreateVote): IServiceResponse<IVote | null> => {
    try {
    const vote: IVote = {
        id: Date.now(),
        ...payload
    }
    votes.push(vote)
    
    return {
        message: "Voto creado exitosamente",
        ok: true,
        data: vote
    };
    } catch (error) {
        return {
            message: "Error al crear el voto",
            ok: false,
            data: null
        };
    }
}
    