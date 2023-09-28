import Joi from "joi";
import Flight from "./model"
import { error } from "../../helpers/response";


export const createSchema = Joi.object({
    name: Joi.string().required(),
    flight_number: Joi.string().required(),
    seats: Joi.number().required(),
    first_class: Joi.number().required(),
    business: Joi.number().required(),
    economy: Joi.number().required(),
    departure_city: Joi.string().required().lowercase(),
    destination_city: Joi.string().required().lowercase(),
    date: Joi.date().required(),
    price: Joi.number().required(),
}).required();

export const listSchema = Joi.object({
    departure_city: Joi.string().lowercase(),
    destination_city: Joi.string().lowercase(),
    date: Joi.date()
})

export const validateCreate = async (req, res, next) => {
    const flight = await Flight.findOne({flight_number: req.body.flight_number})
    if (flight) return error(res, 400, `Flight already exists `);
    return next();
}
