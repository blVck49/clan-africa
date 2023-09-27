import { error, success } from "../../helpers/response";
import Paginate from "../base/helper";
import Flight from "./model";

// If none of the query filters are passed, the endpoint returns all available flights
export const list = async (req, res) => {
    try {
        let filter = {}
        const { departure_city, destination_city, date } = req.query;
        if (departure_city) filter.departure_city = departure_city;
        if (destination_city) filter.destination_city = destination_city
        if (date) filter.date = date
        const result = await Paginate({ modelName: "Flight", filter });
        return success(res, 200, result);
    } catch (err) {
        return error(res, 500, err);
    }
};

export const create = async (req, res) => {
    try {
        const result = await new Flight(req.body).save();
        return success(res, 200, result);
    } catch (err) {
        return error(res, 500, err);
    }
};
