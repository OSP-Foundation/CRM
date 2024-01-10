import { Router, Request, Response, NextFunction } from "express";
import Customer from "../controllers/customer";

const router = Router()

const customer = new Customer()

// replace after config authentication
const CheckLogged = (req: Request, res: Response, next: NextFunction) => {
    next()
}

router.get("/", CheckLogged, customer.getAll.bind(customer))

export default router;