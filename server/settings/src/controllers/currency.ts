import { Request, Response } from "express";
import CurrencyService from "../services/currency"

class Currency {
    private repo: CurrencyService;

    constructor() {
        this.repo = new CurrencyService();
    }

    async update(req: Request, res: Response) {
        const userId: string = typeof req?.query?.userId == 'string' ? req?.query?.userId : ""

        if (typeof req?.body?.name == 'string' &&
            typeof req?.body?.symbol == 'string' &&
            typeof req?.body?.position == 'string') {
            try {
                await this.repo.update(req?.body, userId)

                res?.status(200).json({
                    status: 200,
                    message: "Success"
                })
            } catch (err) {
                res?.status(500).json({
                    status: 500,
                    message: err
                })
            }
        } else {
            res?.status(400).json({
                status: 400,
                message: "Enter Required Data"
            })
        }
    }

    async get(req: Request, res: Response) {
        const userId: string = typeof req?.query?.userId == 'string' ? req?.query?.userId : ""

        try {
            const data = await this.repo.get(userId)

            res?.status(200).json({
                status: 200,
                message: "Success",
                data
            })
        } catch (err) {
            res?.status(500).json({
                status: 500,
                message: err
            })
        }
    }
}

export default Currency