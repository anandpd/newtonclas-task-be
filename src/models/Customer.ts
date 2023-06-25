import { DataTypes, Model, Optional, Sequelize } from 'sequelize';
import { CONSTANT } from '../utils/constant';
import db from '../utils/db/connection';
import { Ticket } from './Ticket';

const model = {
    customerId: {
        type: DataTypes.UUID,
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
    address: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    }
};

export interface ICustomerAttr {
    customerId: string,
    firstName: string,
    lastName: string,
    age: number,
    sex: string,
    address: string,
    email: string,
    createdAt?: Date
}

export interface ICustomerCreateAttr extends Optional<ICustomerAttr, 'customerId'> { }

interface CustomerInstance extends Model<ICustomerAttr, ICustomerCreateAttr> {
    createdAt?: Date;
    updateAt?: Date;
}
export const Customer = db.sequelize.define<CustomerInstance>(CONSTANT.MODELS.CUSTOMER, model, {
    timestamps: true,
    freezeTableName: true
});

Customer.hasMany(Ticket, { foreignKey: "customerId", as: "ticketDetails" });
Ticket.belongsTo(Customer, { foreignKey: "customerId", as: "customerDetails" });