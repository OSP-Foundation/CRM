import mongoose from "mongoose";

const companySchema = new mongoose.Schema({
    user: {
        type: mongoose.SchemaTypes.ObjectId,
        unique: true,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    website: String,
    email: {
        type: String,
        required: true
    },
})

export default mongoose.model("CompanySettings", companySchema)