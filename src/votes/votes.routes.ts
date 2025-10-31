import { Router } from "express";
import { deleteVoteController, getVoteController, getVoteIdController, patchVotePartialController, postVoteController, putVoteController } from "./votes.controller";

const voteRouter = Router();

//C.R.U.D.

//create
voteRouter.post('/createVote', postVoteController);

//read
voteRouter.get('/getVotes', getVoteController);
voteRouter.get('/getVote/:id', getVoteIdController);

//update
voteRouter.put('/vote/:id', putVoteController);
voteRouter.patch('/votePartial/:id', patchVotePartialController);

//delete
voteRouter.delete('/vote/:id', deleteVoteController);

export default voteRouter;
