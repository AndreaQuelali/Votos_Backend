import express from "express";
import bodyParser from "body-parser";
import router from "./routes";
import healthRouter from "./healthCheck/healthCheck.routes";
import dotenv from "dotenv";
import voteRouter from "./votes/votes.routes";

dotenv.config();

const PORT = process.env.PORT || 3001;

const app = express();

app.use(bodyParser.json());
app.use("/", router);
app.use("/", healthRouter);
app.use("/", voteRouter);



app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
})