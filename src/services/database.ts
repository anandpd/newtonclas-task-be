
export const db = {
    FindAll: async (modelName: any, options: any): Promise<any> => {
        try {
            const data = await modelName.findAll(options);
            return data;
        } catch (error) {
            throw error;
        }
    },
    FindOne: async (modelName: any, options: any): Promise<any> => {
        try {
            const res = await modelName.findOne(options);
            return res;
        } catch (error) {
            throw error;
        }
    },
    FindByPrimaryKey: async (modelName: any, pk: any): Promise<any> => {
        try {
            const res = await modelName.findByPk(pk);
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
    Update: async (modelInstance: any, data: any): Promise<any> => {
        try {
            modelInstance.set(data);
            const res = await modelInstance.save();
            return res;
        } catch (error) {
            throw error;
        }
    },
    DeleteByPrimaryKey: async (modelName: any, options: any): Promise<any> => {
        try {
            await modelName.destroy(options)
            return true;
        } catch (error) {
            throw error;
        }
    },

}