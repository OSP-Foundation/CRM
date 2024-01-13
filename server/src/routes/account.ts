import { Router, Response, Request, NextFunction } from "express";
import Account from "../controllers/account";

const router = Router()

const account = new Account();

// replace after config authentication
const CheckLogged = (req: Request, res: Response, next: NextFunction) => {
    next()
}

router.post("/register-manual", CheckLogged, account?.RegisterManual?.bind(account))

export default router;