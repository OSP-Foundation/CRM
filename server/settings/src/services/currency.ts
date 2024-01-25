import mongoose from "mongoose";
import { Currency } from "../models"

interface currency {
    name: string,
    symbol: string,
    position: "before" | "after"
}

class CurrencyService {
    private currency: typeof Currency;

    constructor() {
        this.currency = Currency;
    }

    update(details: currency, user: string) {
        return new Promise<void>(async (resolve, reject) => {
            try {
                await this.currency.updateOne({
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
        return new Promise<currency | object>(async (resolve, reject) => {
            try {
                const currency = await this.currency.findOne({
                    user: new mongoose.Types.ObjectId(user)
                })

                resolve(currency ? {
                    name: currency?.name,
                    symbol: currency?.symbol,
                    position: currency?.position
                } : {})
            } catch (err: any) {
                reject(err?._message)
            }
        })
    }
}

export default CurrencyService