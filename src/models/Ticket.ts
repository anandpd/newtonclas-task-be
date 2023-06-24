import { DataTypes } from 'sequelize';
import { CONSTANT } from '../utils/constant';
import db from '../utils/db/connection';

const model = {
    ticket_id: {
        type: DataTypes.UUID,
        allowNull: false,
        unique: true,
        primaryKey: true
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    location: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    seat_num: {
        type: DataTypes.INTEGER,
        autoincrement: true,
        default: 100
    },
    add_ons: {
        type: DataTypes.STRING,
        allowNull: true
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

