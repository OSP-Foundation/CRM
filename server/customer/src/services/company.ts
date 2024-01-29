import mongoose, { ObjectId } from "mongoose";
import { Company } from "../models";

interface company {
    name: string,
    country?: string,
    phone?: string,
    email?: string,
    website?: string,
    contact?: ObjectId
}

class CompanyService {
    private company: typeof Company;

    constructor() {
        this.company = Company;
    }

    insert(details: company, user: string) {
        return new Promise<void>(async (resolve, reject) => {
            try {
                await this.company.create({
                    user: new mongoose.Types.ObjectId(user),
                    ...details
                })

                resolve()
            } catch (err: any) {
                reject(err?._message)
            }
        })
    }
}

export default CompanyService;