import { NextFunction, Request, Response, Router } from "express";
import Account from "../controllers/account";

const account = new Account();

const router = Router();

const CheckLogged = (req: Request, res: Response, next: NextFunction) => {
    account?.CheckLogged(req, res, next, true)
}

router.post("/register-request", CheckLogged, account?.requestRegister?.bind(account))

router.post("/register-verify", CheckLogged, account?.registerVerify?.bind(account))

router.post("/register-google", CheckLogged, account?.registerGoogle?.bind(account))

router.get("/login-manual", CheckLogged, account?.loginManual?.bind(account))

router.get('/login-google', CheckLogged, account?.loginGoogle?.bind(account))

router.post('/forgot-request', CheckLogged, account?.requestForgot?.bind(account))

router.post("/forgot-verify", CheckLogged, account?.forgotVerify?.bind(account))

router.get("/me", account?.getMe?.bind(account))

router.put('/update-password', account.CheckLogged.bind(account), account?.updatePassword?.bind(account))

router.put('/update-details', account.CheckLogged.bind(account), account?.updateDetails?.bind(account))

router.get('/logout', (req: Request, res: Response) => {
    res.clearCookie("token").status(200).json({
        status: 200,
        message: "Success"
    })
})

export default router;