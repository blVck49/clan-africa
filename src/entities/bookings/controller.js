import { Types } from "mongoose";
import { error, success } from "../../helpers/response";
import Booking from "./model";
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
        const link = await generatePaymentCheckoutLink(data)
        let result = await new Booking({_id: _id, ...req.body, link}).save();
        return success(res, 200, result);
    } catch (err) {
        return error(res, 500, err);
    }
};

export const get = async (req, res) => {
    try {
        const result = await Booking.findOne({customer_name: req.body.customer_name})
        .populate({path: "flight", select: "name flight_number departure_city destination_city date"})
        return success(res, 200, result);
    } catch (err) {
        return error(res, 500, err);
    }
};



