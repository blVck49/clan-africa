import { model } from "mongoose";

export const paginate = async (data) => {
    const { modelName, filter, projection, page, limit, populate, sort } = data;
    const options = {
        projection,
        page: page || 1,
        limit: limit || 20,
        lean: true,
        populate,
        sort: sort || { createdAt: -1 }
    };
    const result = await model(modelName).paginate({ ...filter }, options);
    return result;
};


export default paginate;
