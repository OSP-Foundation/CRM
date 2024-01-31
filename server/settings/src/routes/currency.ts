import { Router } from "express";
import Currency from "../controllers/currency";

const currency = new Currency()

const router = Router()

router.put("/", currency?.update?.bind(currency))

router.get("/", currency?.get?.bind(currency))

export default router;