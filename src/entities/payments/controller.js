import { error, success } from "../../helpers/response";
import { verifyTransaction } from "../../services/payment";
import Booking from "../bookings/model"

export const confirm = async (req, res) => {
    try {
        const { tx_ref, transaction_id } = req.body
        const reference = transaction_id
        const payment = await verifyTransaction(reference);
        const paymentVerified = payment.data.status === "successful";
        if (!paymentVerified) return error(res, 404, "Payment unsuccessful");
        const result = await Booking.findByIdAndUpdate(tx_ref, { $set: { paid: true } }, { new: true })
        return success(res, 200, result);
    } catch (err) {
        return error(res, 500, err);
    }
};
