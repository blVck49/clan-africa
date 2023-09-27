import Joi from "joi";
import { error } from "../../helpers/response";
import Booking from "../bookings/model";

//tx_ref is the refernce number created locally
//transaction_id is the unique number flutterwave assigns to each transaction

export const confirmSchema = Joi.object({
    tx_ref: Joi.string().required(),
    transaction_id: Joi.string().required(),
}).required();

export const validateConfirmRequest = async (req, res, next) => {
    try {
        const { tx_ref, transaction_id } = req.body
        const booking = await Booking.findById(tx_ref);
        if (!booking) {
            return error(res, 404, "Booking not found");
        }
        if (!transaction_id) {
            return error(res, 400, "Missing transaction_id");
        }
        return next();
    } catch (err) {
        return error(res, 500, err);
    }
};
