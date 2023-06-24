import { Model, ModelCtor } from 'sequelize';
import * as Models from '../models';

export const queryDB = {
    FindAll: async (modelName: any, attributes: any[]): Promise<any> => {
        try {
            const res = await modelName.findAll({ attributes: attributes.length > 0 ? attributes : [] });
            return res;
        } catch (error) {
            throw error;
        }
    },
    FindOne: async (modelName: any, filter: any): Promise<any> => {
        try {
            const res = await modelName.findOne(filter);
            return res;
        } catch (error) {
            throw error;
        }
    },
    Create: async (modelName: any, data: any): Promise<any> => {
        try {
            const res = await modelName.create(data);
            return res;
        } catch (error) {
            throw error;
        }
    },
    Update: async (modelName: any, data: any): Promise<any> => {
        try {
            const res = await modelName.create(data);
            return res;
        } catch (error) {
            throw error;
        }
    }

}