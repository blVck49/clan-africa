import { Router } from "express";
import { validator } from "../../helpers/utils";
import {
    create,
    list

} from "./controller";
import {
    createSchema,
    listSchema,
    validateCreate

} from "./request";


const router = Router();


router.post("/create", validator.body(createSchema), validateCreate, create);
router.get("/list", validator.query(listSchema), list)




export default router;
