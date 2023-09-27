import cors from "cors";
import "dotenv/config";
import express from "express";
import helmet from "helmet";
import mongoose from "mongoose";
import { shouldSendSameSiteNone } from "should-send-same-site-none";
import routes from "./entities/base/route";

const app = express();
app.use(helmet());
app.use(shouldSendSameSiteNone);
app.set("trust proxy", 1);
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: false }));
const { PORT, DATABASE_URL } = process.env;

mongoose
    .connect(DATABASE_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("Connected to database"))
    .catch((err) => console.log("DB connection error", err.message || err));

const corsOptions = {
    credentials: true,
    origin(origin, callback) {
        const allowedOrigin = !origin || permittedUrls.some((value) => origin.includes(value));
        if (allowedOrigin) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    }
};
app.use(cors(corsOptions));



app.use("/", routes);
app.listen(PORT, () => console.log(`Server up and running on port ${PORT}`));

