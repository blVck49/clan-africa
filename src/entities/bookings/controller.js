import { Types } from "mongoose";
import { error, success } from "../../helpers/response";
import Booking from "./model";
import Paginate from "../base/helper";
import { generatePaymentCheckoutLink } from "../../services/payment";

const { ObjectId } = Types;


export const create = async (req, res) => {
    try {
        const flight = res.locals.flight
        const _id = ObjectId()
        const data = {
            amount: flight.price,
            reference: _id,
            email: req.body.email
        }
        const link = await generatePaymentCheckoutLink(data, process.env.secretKey)
        const result = await new Booking({_id: _id, ...req.body, link}).save();
        return success(res, 200, result);
    } catch (err) {
        return error(res, 500, err);
    }
};

export const list = async (req, res) => {
    try {
        const { name } = req.query
        let filter = {}
        if (name) filter.name = name
        const populate = {path: "flight", select: "name flight_number departure_city destination_city date"}
        const result = await Paginate({ modelName: "Booking", filter, populate });
        return success(res, 200, result);
    } catch (err) {
        return error(res, 500, err);
    }
};



