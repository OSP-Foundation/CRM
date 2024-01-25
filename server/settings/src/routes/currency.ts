import { Router } from "express";
import Currency from "../controllers/currency";

const currency = new Currency()

const router = Router()

router.put("/update", currency?.update?.bind(currency))

router.get("/get", currency?.get?.bind(currency))

export default router;