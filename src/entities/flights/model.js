import { model, Schema } from "mongoose";
import paginator from "mongoose-paginate-v2";

const schema = new Schema(
    {
        name: { type: "String", required: true},
        flight_number: {type: "String", required: true},
        seats: { type: "Number", required: true},
        first_class: { type: "Number", required: true},
        business: { type: "Number", required: true},
        economy: { type: "Number", required: true},
        departure_city: { type: "String", required: true, trim: true },
        price: { type: "Number", required: true, trim: true },
        destination_city: { type: "String", required: true},
        date: { type: "Date", required: true}
    },
    { timestamps: true }
);

schema.plugin(paginator);
export default model("Flight", schema);
