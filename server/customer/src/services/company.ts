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

    count(user: string) {
        return new Promise<number>(async (resolve, reject) => {
            try {
                const count = await this.company.countDocuments({
                    user: new mongoose.Types.ObjectId(user)
                })

                resolve(count)
            } catch (err: any) {
                reject(err?._message)
            }
        })
    }

    getItems({ limit = 20, search, skip = 0 }: {
        limit?: number,
        search?: string,
        skip?: number
    }, user: string) {
        return new Promise<{}[]>(async (resolve, reject) => {
            try {
                const query = search ? {
                    name: {
                        $regex: search,
                        $options: "i"
                    }
                } : {}

                const res = await this.company.find({
                    ...query,
                    user: new mongoose.Types.ObjectId(user)
                }).sort({ _id: -1 }).skip(skip).limit(limit).populate("contact").select("-user");

                resolve(res)
            } catch (err: any) {
                reject(err?._message)
            }
        })
    }

    updateOne({ _id, user }: { _id: string, user: string }, details: company) {
        return new Promise<void>(async (resolve, reject) => {
            try {
                await this.company.updateOne({
                    _id: new mongoose.Types.ObjectId(_id),
                    user: new mongoose.Types.ObjectId(user),
                }, {
                    $set: {
                        name: details?.name,
                        country: details?.country,
                        phone: details?.phone,
                        email: details?.email,
                        website: details?.website,
                        contact: typeof details?.contact == 'string' ? new mongoose.Types.ObjectId(details?.contact) : details?.contact ? details?.contact : null
                    }
                })

                resolve()
            } catch (err: any) {
                reject(err?._message)
            }
        })
    }

    deleteOne({ _id, user }: { _id: string, user: string }) {
        return new Promise<void>(async (resolve, reject) => {
            try {
                await this.company.deleteOne({
                    _id: new mongoose.Types.ObjectId(_id),
                    user: new mongoose.Types.ObjectId(user),
                })

                resolve()
            } catch (err: any) {
                reject(err?._message)
            }
        })
    }
}

export default CompanyService;