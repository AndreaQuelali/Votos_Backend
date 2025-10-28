//const Router = require('express').Router;
//const router = Router();

import {Router} from 'express';

const voteController = require('./controllers');

const router = Router();

router.get('/', (req, res) => {
    res.send('Hello World!')
})

router.post('/vote', voteController.postVoteController)
    
export default router;