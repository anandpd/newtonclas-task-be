import { DataTypes, Model, Optional, Sequelize } from 'sequelize';
import { CONSTANT } from '../utils/constant';
import db from '../utils/db/connection';

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
    }
};

export interface ICustomerAttr {
    customerId: string,
    firstName: string,
    lastName: string,
    age: number,
    sex: string,
    address: string
}

export interface ICustomerCreateAttr extends Optional<ICustomerAttr, 'customerId'> { }

interface CustomerInstance extends Model<ICustomerAttr, ICustomerCreateAttr> {
    createdAt?: Date;
    updateAt?: Date;
}
export const Customer = db.sequelize.define<CustomerInstance>(CONSTANT.MODELS.CUSTOMER, model);
