import mongoose from "mongoose";
import { Company } from "../models";

interface company {
    name: string,
    address: string,
    state: string,
    country: string,
    website?: string,
    email: string
}

class CompanyService {
    private company: typeof Company;

    constructor() {
        this.company = Company;
    }

    update(details: company, user: string) {
        return new Promise<void>(async (resolve, reject) => {
            try {
                await this.company.updateOne({
                    user: new mongoose.Types.ObjectId(user)
                }, {
                    $set: {
                        user: new mongoose.Types.ObjectId(user),
                        ...details
                    }
                }, {
                    upsert: true
                })

                resolve()
            } catch (err: any) {
                reject(err?._message)
            }
        })
    }

    get(user: string) {
        return new Promise<company | object>(async (resolve, reject) => {
            try {
                const company = await this.company.findOne({
                    user: new mongoose.Types.ObjectId(user)
                })

                resolve(company ? {
                    name: company?.name,
                    address: company?.address,
                    country: company?.country,
                    email: company?.email,
                    state: company?.state,
                    website: company?.website
                } : {})
            } catch (err: any) {
                reject(err?._message)
            }
        })
    }
}

export default CompanyService