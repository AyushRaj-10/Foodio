import express from 'express';
import {save_food , get_food} from '../controllers/food.js'

const router = express.Router();

router.post('/savefood', save_food);
router.get('/getfood', get_food)

export default router;