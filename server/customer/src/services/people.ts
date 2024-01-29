import mongoose, { ObjectId } from "mongoose";
import { People } from "../models";

interface people {
    name: string,
    country?: string,
    phone?: string,
    email?: string,
    company?: ObjectId
}

class PeopleService {
    private people: typeof People;

    constructor() {
        this.people = People;
    }

    insert(details: people, user: string) {
        return new Promise<void>(async (resolve, reject) => {
            try {
                await this.people.create({
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
                const count = await this.people.countDocuments({
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

                const res = await this.people.find({
                    ...query,
                    user: new mongoose.Types.ObjectId(user)
                }).sort({ _id: -1 }).skip(skip).limit(limit);

                resolve(res)
            } catch (err: any) {
                reject(err?._message)
            }
        })
    }
}

export default PeopleService;