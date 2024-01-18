import { Router } from "express";
import account from './account'

const router = Router()

router.use("/account", account)

export default router;