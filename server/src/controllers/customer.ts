import { Request, Response } from "express";
import CustomerService from "../services/customer";

class Customer {
    private customer: CustomerService;

    constructor() {
        this.customer = new CustomerService()
    }

    async getAll(req: Request, res: Response) {
        try {
            const response = await this.customer.getAll()

            res.status(200).json({
                status: 200,
                message: "Success",
                data: response
            })
        } catch (err) {
            res.status(500).json({
                status: 500,
                message: err
            })
        }
    }
}

export default Customer;