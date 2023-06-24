import { DataTypes, Sequelize } from 'sequelize';
import { CONSTANT } from '../utils/constant';
import db from '../utils/db/connection';

const model = {
    customer_id: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        primaryKey: true
    },
    firstName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    age: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    sex: {
        type: DataTypes.STRING,
        allowNull: false
    },
};



export const Customer = db.sequelize.define(CONSTANT.MODELS.CUSTOMER, model);
