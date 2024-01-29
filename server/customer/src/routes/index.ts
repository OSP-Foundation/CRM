import { Router } from "express";
import customer from './customer'
import people from './people'
import company from './company'

const router = Router()

router.use("/company", company)

router.use("/people", people)

router.use("/customer", customer)

export default router;