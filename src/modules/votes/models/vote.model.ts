import { DataTypes, Model } from "sequelize";
import sequelize from "../../../config/database.config";
import { IVote } from "../interfaces/vote.interface";
import { ICreateVote } from "../dtos/createVote.dto";


class Vote extends Model <IVote, ICreateVote> {}
Vote.init
    (    
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        date: {
            type: DataTypes.DATE,
            allowNull: false
        },
        count: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        finished: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    },
    {
        sequelize,
        modelName: "Vote",
        tableName: "votes",
        timestamps: true,
    }       
    )
    
export default Vote;