import mongoose from "mongoose";

const currencySchema = new mongoose.Schema({
    user: {
        type: mongoose.SchemaTypes.ObjectId,
        unique: true,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    symbol: {
        type: String,
        required: true
    },
    position: {
        type: String,
        default: "before",
        required: true,
        lowercase: true
    },
})

export default mongoose.model("Currency", currencySchema)