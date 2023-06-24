import { DataTypes, Model, Optional } from 'sequelize';
import { CONSTANT } from '../utils/constant';
import db from '../utils/db/connection';


const model = {
    movieId: {
        type: DataTypes.UUID,
        allowNull: false,
        unique: true,
        primaryKey: true
    },
    movieTitle: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    movieTime: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
};

export interface IMovieAttr {
    movieId: string,
    movieTitle: string,
    movieTime: string
}

export interface IMovieCreateAttr extends Optional<IMovieAttr, 'movieId'> { }

interface MovieInstance extends Model<IMovieAttr, IMovieCreateAttr> {
    createdAt?: Date;
    updatedAt?: Date;
}

export const Movie = db.sequelize.define<MovieInstance>(CONSTANT.MODELS.MOVIE, model, {
    timestamps: true,
    freezeTableName: true
});
