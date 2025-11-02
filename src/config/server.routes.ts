import { Router, Request, Response } from "express";   
import healthRouter from "../modules/healthCheck/healthCheck.routes";
import voteRouter from "../modules/votes/votes.routes";

const router = Router();

router.use("/", healthRouter);
router.use("/vote", voteRouter);
router.use((req: Request, res: Response) => {
    res.status(404).send({message: "Not Found", status: 404, ok: false});
});

export default router;
