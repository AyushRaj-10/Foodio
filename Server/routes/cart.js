import express from 'express';
import { addToCart, updateCart, deleteFromCart , getCart } from '../controllers/cart.js';

const router = express.Router();

router.post('/cart', addToCart);
router.put('/cart', updateCart)
router.delete('/cart', deleteFromCart)
router.get('/cart/:userId', getCart)

export default router;