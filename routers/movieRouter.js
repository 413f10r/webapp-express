import express from 'express'
const router = express.Router()

import { index, show, destroy, update } from "../constrollers/movieController.js";


router.get('/', index);

router.get('/:id', show);

router.delete('/:id', destroy);

router.patch('/:id', update)


export default router;