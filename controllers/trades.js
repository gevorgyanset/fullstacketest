const Trade = require('../models/trades');

// Handler to create a new trade
const createTrade = async (req, res) => {
    try {
        const { type, user_id, symbol, shares, price, timestamp } = req.body;

        // Validate the trade details
        if (!['buy', 'sell'].includes(type) || shares < 1 || shares > 100) {
            return res.status(400).send('Invalid trade details');
        }

        const newTrade = await Trade.create({ type, user_id, symbol, shares, price, timestamp });
        res.status(201).json(newTrade);
    } catch (error) {
        res.status(500).send('Server error');
    }
};

// Handler to get all trades, optionally filtered by type and/or user_id
const getAllTrades = async (req, res) => {
    try {
        const { type, user_id } = req.query;
        let filter = {};

        if (type) {
            filter.type = type;
        }
        if (user_id) {
            filter.user_id = user_id;
        }

        const trades = await Trade.findAll({ where: filter, order: [['id', 'ASC']] });
        res.status(200).json(trades);
    } catch (error) {
        res.status(500).send('Server error');
    }
};

// Handler to get a trade by ID
const getTradeById = async (req, res) => {
    try {
        const trade = await Trade.findByPk(req.params.id);
        if (trade) {
            res.status(200).json(trade);
        } else {
            res.status(404).send('ID not found');
        }
    } catch (error) {
        res.status(500).send('Server error');
    }
};

module.exports = {
    createTrade,
    getAllTrades,
    getTradeById
};
