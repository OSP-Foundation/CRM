import { Request, Response } from "express";
import PeopleService from "../services/people";

class People {
    private repo: PeopleService;

    constructor() {
        this.repo = new PeopleService()
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

    async getAll(req: Request, res: Response) {
        const user = typeof req?.query?.userId == 'string' ? req?.query?.userId : ''

        try {
            let total: number | null = null

            if ((typeof req?.query?.total == 'string' &&
                req?.query?.total == 'true') ||
                (typeof req?.query?.total == 'boolean' &&
                    req?.query?.total == true)) {
                total = await this.repo.count(user)
            }

            const items = await this.repo.getItems({
                limit: typeof req?.query?.limit == 'string' ? parseInt(req?.query?.limit) : typeof req?.query?.limit == 'number' ? req?.query?.limit : undefined,
                skip: typeof req?.query?.skip == 'string' ? parseInt(req?.query?.skip) : typeof req?.query?.skip == 'number' ? req?.query?.skip : undefined,
                search: typeof req?.query?.search == 'string' ? req?.query?.search?.length >= 1 ? req?.query?.search : undefined : undefined
            }, user)

            res?.status(200).json({
                status: 200,
                message: "Success",
                data: {
                    items,
                    total
                }
            })
        } catch (err) {
            res?.status(500).json({
                status: 500,
                message: err
            })
        }
    }
}

export default People;