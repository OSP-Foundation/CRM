import { Request, Response } from "express";
import CompanyService from "../services/company";

class Company {
    private repo: CompanyService;

    constructor() {
        this.repo = new CompanyService()
    }

    async insert(req: Request, res: Response) {
        const user = typeof req?.query?.userId == 'string' ? req?.query?.userId : ''

        try {
            await this.repo.insert(req?.body, user)

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
}

export default Company;