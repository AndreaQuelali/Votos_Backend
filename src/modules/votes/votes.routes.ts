import { Router } from "express";
import { deleteVoteController, getVoteController, getVoteIdController, patchVotePartialController, postVoteController, putVoteController } from "./votes.controller";

const voteRouter = Router();

//C.R.U.D.
//create
voteRouter.post('/', postVoteController);

//read
voteRouter.get('/', getVoteController);
voteRouter.get('/:id', getVoteIdController);

//update
voteRouter.put('/:id', putVoteController);
voteRouter.patch('/:id', patchVotePartialController);

//delete
voteRouter.delete('/:id', deleteVoteController);

export default voteRouter;
