import { Router } from "express";
import { validator } from "../../helpers/utils";
import {
    confirm

} from "./controller";
import {
    confirmSchema,
    validateConfirmRequest

} from "./request";


const router = Router();


router.post("/confirm", validateConfirmRequest, validator.body(confirmSchema), confirm);


export default router;
