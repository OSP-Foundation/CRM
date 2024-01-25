import { NextFunction, Request, Response } from "express";
import user from "../config/user";

const CheckLogged = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const response = await user?.get('/me', {
            headers: {
                "cookie": `token=${req?.cookies?.token}`
            }
        })

        req.query.userId = response?.['data']?.data?._id

        next()
    } catch (err: any) {
        res?.status(err?.response?.status ? err?.response?.status : 500).json(err?.response?.data ? err?.response?.data : {
            status: 500,
            message: "Something Went Wrong"
        })
    }
}

export default CheckLogged