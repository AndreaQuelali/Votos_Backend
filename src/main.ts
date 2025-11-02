import express from "express";
import bodyParser from "body-parser";
import router from "./config/server.routes";
import { ENV } from "./config/env.config";

const PORT = ENV.PORT || 3001;

const app = express();

app.use(bodyParser.json());
app.use("/", router);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
})