import { Request, Response } from "express";
import CustomerService from "../services/customer";

class Customer {
    private customer: CustomerService;

    constructor() {
        this.customer = new CustomerService()
    }
}

export default Customer;