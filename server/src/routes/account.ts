import { Router, Response, Request, NextFunction } from "express";

const router = Router()

// replace after config authentication
const CheckLogged = (req: Request, res: Response, next: NextFunction) => {
    next()
}

router.get("/", CheckLogged)

export default router;