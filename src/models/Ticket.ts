import { DataTypes, Model, Optional } from 'sequelize';
import { CONSTANT } from '../utils/constant';
import db from '../utils/db/connection';
import { Movie } from './Movie';

const model = {
    ticketId: {
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
    seatNum: {
        type: DataTypes.INTEGER,
        autoincrement: true,
        default: 100
    },
    addOns: {
        type: DataTypes.STRING,
        allowNull: true
    },
    customerId: {
        type: DataTypes.UUID,
        allowNull: false
    },
    movieId: {
        type: DataTypes.UUID,
        allowNull: false,
    }
};

export interface ITicketAttr {
    ticketId: string,
    price: number,
    location: string,
    seatNum: number,
    addOns?: string,
    customerId: string,
    movieId: string
}

export interface ITicketCreateAttr extends Optional<ITicketAttr, 'ticketId'> { }

export interface TicketInstance extends Model<ITicketAttr, ITicketCreateAttr> {
    createdAt?: Date;
    updatedAt?: Date;
}


export const Ticket = db.sequelize.define<TicketInstance>(CONSTANT.MODELS.TICKET, model, {
    timestamps: true,
    freezeTableName: true
});

Movie.hasMany(Ticket, { foreignKey: 'movieId', as: "movieDetails" });
Ticket.belongsTo(Movie, { foreignKey: 'movieId', as: "movieDetails" });
// Customer.hasMany(Ticket, { foreignKey: "customerId", as: "ticketDetails" });
// Ticket.belongsTo(Customer, { foreignKey: "customerId", as: "customerDetails" });
