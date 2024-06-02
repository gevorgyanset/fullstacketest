const express = require('express');
const router = express.Router();
const { createTrade, getAllTrades, getTradeById } = require('../controllers/trades');

// Route to create a new trade
router.post('/', createTrade);

// Route to get all trades or filter by type/user_id
router.get('/', getAllTrades);

// Route to get a specific trade by ID
router.get('/:id', getTradeById);

// Routes for DELETE, PUT, PATCH should return 405
router.delete('/:id', (req, res) => res.status(405).send('Method not allowed'));
router.put('/:id', (req, res) => res.status(405).send('Method not allowed'));
router.patch('/:id', (req, res) => res.status(405).send('Method not allowed'));

module.exports = router;
