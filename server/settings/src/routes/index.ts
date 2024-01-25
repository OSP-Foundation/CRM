import { Router } from "express";
import company from './company'
import currency from './currency'

const router = Router()

router.use("/company", company)

router.use("/currency", currency)

export default router;