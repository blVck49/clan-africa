import { Router } from "express";
import flightRouter from "../flights/route";
import bookingRouter from "../bookings/route";
import paymentRouter from "../payments/route"

const router = Router();

router.get("/", (req, res) => res.json({ message: "Welcome to Clan Africa" }));
router.use("/flights", flightRouter),
router.use("/bookings", bookingRouter),
router.use("/payments", paymentRouter)

export default router;
