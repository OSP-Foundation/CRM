import { Customer } from "../models";

class CustomerService {
    private customer: typeof Customer;

    constructor() {
        this.customer = Customer
    }
}

export default CustomerService;