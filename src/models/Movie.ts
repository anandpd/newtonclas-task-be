import { DataTypes, Sequelize } from 'sequelize';
import { CONSTANT } from '../utils/constant';
import db from '../utils/db/connection';


const model = {
    movie_id: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        primaryKey: true
    },
    movie_title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    movie_time: {
        type: DataTypes.FLOAT,
        allowNull: false
    }
};


export const Movie = db.sequelize.define(CONSTANT.MODELS.MOVIE, model);
