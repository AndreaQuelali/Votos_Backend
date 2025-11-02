import {Sequelize} from "sequelize";
import { ENV } from "./env.config";

const sequelize = new Sequelize(
    ENV.POSTGRES_DB,
    ENV.POSTGRES_USER,
    ENV.POSTGRES_PASSWORD,
    {
        host: ENV.PGHOST,
        port: Number(ENV.PGPORT),
        logging: false,
        dialect: "postgres",
        define: {
            timestamps: true,
        },
    }
)