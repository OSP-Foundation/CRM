import { Request, Response } from "express";
import CompanyService from "../services/company"

class Company {
    private repo: CompanyService;

    constructor() {
        this.repo = new CompanyService();
    }

    async update(req: Request, res: Response) {
        const userId: string = typeof req?.query?.userId == 'string' ? req?.query?.userId : ""

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

export default Company