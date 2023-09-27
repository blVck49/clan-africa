import { model, Schema } from "mongoose";
import paginator from "mongoose-paginate-v2";

const schema = new Schema(
    {
        name: { type: "String", required: true },
        phone: { type: "String", required: true},
        email: { type: "String", required: true},
        flight: { type: Schema.Types.ObjectId, required: true, ref: "Flight" },
        paid: { type: "Boolean", required: true, default: false},
        link: { type: "String", required: true }
    },
    { timestamps: true }
);

schema.plugin(paginator);
export default model("Booking", schema);
