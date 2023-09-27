import MongoStore from "connect-mongo";
import cors from "cors";
import "dotenv/config";
import express from "express";
import expressSession from "express-session";
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
const { PORT } = process.env;

const DATABASE_URL = "mongodb://temp-user:91B28j02lk9PJz1F@temp-cluster-shard-00-00.jiz6a.mongodb.net:27017,temp-cluster-shard-00-01.jiz6a.mongodb.net:27017/backend?authSource=admin&replicaSet=atlas-epzmrc-shard-0&w=majority&readPreference=primary&appname=MongoDB%20Compass&retryWrites=true&ssl=true"
const SESSION_SECRET = "O2-K5lIui"
const NODE_ENV = "local"

const port = PORT || 4500;

mongoose
    .connect(DATABASE_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        //useCreateIndex: true,
        //poolSize: 50,
        //useFindAndModify: false
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
app.listen(port, () => console.log(`Server up and running on port ${port}`));

