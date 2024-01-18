import mongoose, { Model } from "mongoose";

interface ITemp {
    _id: mongoose.Types.ObjectId
    email: string,
    type?: string,
    secret?: string,
    expireAt?: Date
}

interface TempModel extends Model<ITemp> {
    findOneWithType({ email, type, ...others }: any): Promise<ITemp>;

    findOneWithTypeAndUpdate({ email, type }: { email: string, type: string }, ...query: any): Promise<ITemp>;

    deleteOneWithType({ email, type }: { email: string, type: string }): Promise<ITemp>;
}

const tempSchema = new mongoose.Schema<ITemp, TempModel>({
    email: {
        type: String,
        lowercase: true,
        required: true,
        unique: true,
        validate: {
            validator: (v: any) => v?.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/),
            message: (props: any) => `${props?.value} is not valid email`
        }
    },
    type: {
        lowercase: true,
        type: String
    },
    secret: {
        type: String
    },
    expireAt: {
        type: Date,
        expires: 3600,
        default: () => new Date()
    }
})

tempSchema.statics.findOneWithType = async function ({ email, type, ...other }: any) {
    try {
        return await this.findOne({ email: `${email?.toLowerCase()}_${type?.toLowerCase()}`, ...other })
    } catch (e) {
        throw e
    }
}

tempSchema.statics.findOneWithTypeAndUpdate = async function ({ email, type }: { email: string, type: string }, ...query: any) {
    try {
        return await this.findOneAndUpdate({
            email: `${email?.toLowerCase()}_${type?.toLowerCase()}`
        }, ...query)
    } catch (e) {
        throw e
    }
}

tempSchema.statics.deleteOneWithType = async function ({ email, type }: { email: string, type: string }) {
    try {
        return await this.deleteOne({ email: `${email?.toLowerCase()}_${type?.toLowerCase()}` })
    } catch (e) {
        throw e
    }
}

tempSchema.pre('save', function (next) {
    this.email = `${this.email}_${this.type}`

    next()
})

export default mongoose.model<ITemp, TempModel>('Temp', tempSchema)