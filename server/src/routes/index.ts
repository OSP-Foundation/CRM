import { Router } from "express";
import customer from './customer'
import account from './account'

const router = Router()

router.use("/customer", customer)

router.use("/account", account)

export default router;