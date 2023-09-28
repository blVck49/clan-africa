import express from "express";
import routes from "../../entities/base/route"

const app = express();
app.use(express.json());

app.use('/', routes);

module.exports = app