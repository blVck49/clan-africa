import { Router } from "express";
import { validator } from "../../helpers/utils";
import {
    create,
    get

} from "./controller";
import {
    createSchema,
    getSchema,
    validateCreate

} from "./request";


const router = Router();


router.post("/create", validateCreate, validator.body(createSchema), create);
router.get("/get", validator.query(getSchema), get)




export default router;
