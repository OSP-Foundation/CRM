import { Customer } from "../models";

class CustomerService {
    private customer: typeof Customer;

    constructor() {
        this.customer = Customer
    }

    getAll() {
        return new Promise<{}[]>(async (resolve, reject) => {
            try {
                const res = await this.customer.find({})

                resolve(res)
            } catch (err: any) {
                reject(err?._message)
            }
        })
    }
}

export default CustomerService;