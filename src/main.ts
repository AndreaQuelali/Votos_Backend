import express from "express";
import bodyParser from "body-parser";
import router from './routes';

const PORT = 3002;

const app = express();

app.use(bodyParser.json());
app.use("/", router);
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})