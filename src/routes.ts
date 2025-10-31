//const Router = require('express').Router;
//const router = Router();

import {Router} from 'express';

import postVoteController from './controllers';

const router = Router();

router.get('/', (req, res) => {
    res.send('Hello World!')
})

router.post('/vote', postVoteController)

export default router;