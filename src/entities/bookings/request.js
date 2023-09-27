import Joi from "joi";
import Flight from "../flights/model"
import { error } from "../../helpers/response";


export const createSchema = Joi.object({
    name: Joi.string().required(),
    phone: Joi.string().required(),
    email: Joi.string().required(),
    flight: Joi.string().required(),
}).required();

export const getSchema = Joi.object({
    name: Joi.string().required(),
}).required();

export const validateCreate = async (req, res, next) => {
    const flight = await Flight.findById(req.body.flight)
    if (!flight) return error(res, 400, `Flight does not exist`);
    res.locals.flight = flight
    return next();
}
