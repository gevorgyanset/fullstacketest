const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('sqlite::memory:');

const Trade = sequelize.define('Trade', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    type: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isIn: [['buy', 'sell']]
        }
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    symbol: {
        type: DataTypes.STRING,
        allowNull: false
    },
    shares: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min: 1,
            max: 100
        }
    },
    price: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    timestamp: {
        type: DataTypes.BIGINT,
        allowNull: false
    }
}, {
    timestamps: false
});

module.exports = Trade;
