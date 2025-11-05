import dotenv from "dotenv";
dotenv.config();

export const ENV = {
    PORT: process.env.PORT || 3001,
    POSTGRES_USER: process.env.POSTGRES_USER || "andy",
    POSTGRES_PASSWORD: process.env.POSTGRES_PASSWORD || "holamundi",
    POSTGRES_DB: process.env.POSTGRES_DB || "bdVotes",
    PGDATA: process.env.PGDATA || "/var/lib/postgresql/data/pgdata",
    PGHOST: process.env.PGHOST || "localhost",
    PGPORT: process.env.PGPORT || 5433,
    NODE_ENV: process.env.NODE_ENV || "development",
    PWD_SECRET: process.env.PWD_SECRET || "psecret",
    SALTS: process.env.SALTS || "512",
    JWT_SECRET: process.env.JWT_SECRET || "jsecret",
}