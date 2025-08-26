import express from 'express';
import { add_address, get_addresses, update_address, delete_address } from '../controllers/address.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

// Create address
router.post('/addresses', authMiddleware , add_address);

// Get all addresses
router.get('/addresses', authMiddleware , get_addresses);

// Update address
router.put('/addresses/:id', authMiddleware , update_address);

// Delete address
router.delete('/addresses/:id', authMiddleware , delete_address);

export default router;
