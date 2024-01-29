import { Request, Response } from "express";
import CustomerService from "../services/customer";

class Customer {
    private repo: CustomerService;

    constructor() {
        this.repo = new CustomerService()
    }
}

export default Customer;