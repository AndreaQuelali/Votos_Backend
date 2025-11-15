import express from "express";
import bodyParser from "body-parser";
import router from "./config/server.routes";
import { ENV } from "./config/env.config";
import sequelize from "./config/database.config";
import "./modules/votes/models/vote.model";

async function connectWithRetry() {
    try {
      await sequelize.authenticate();
      console.info('Database connected');
    } catch (error) {
      console.error('Unable to connect to the database:', error);
      setTimeout(connectWithRetry, 5000);
    }
  }

async function init() {
    try {
        connectWithRetry();
        //await sequelize.authenticate();
        //await sequelize.sync({ force: true });
        console.info("Database connection has been established successfully.");
        
        const PORT = ENV.PORT || 3001;
        const app = express();

        app.use(bodyParser.json());
        app.use("/", router);

        app.listen(PORT, () => {
            console.log(`Server running on http://localhost:${PORT}`)
        })
    } catch (error) {
        console.error("Unable to connect to the database:", error);
    }
}

init();


