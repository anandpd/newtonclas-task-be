import { DataTypes, Sequelize } from 'sequelize';
import { CONSTANT } from '../utils/constant';
import db from '../utils/db/connection';

const model = {
    ticket_id: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        primaryKey: true
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    customer_id: {
        type: DataTypes.STRING,
        allowNull: false
    },
    movie_id: {
        type: DataTypes.STRING,
        allowNull: false,
    }
};


export const Ticket = db.sequelize.define(CONSTANT.MODELS.TICKET, model);

