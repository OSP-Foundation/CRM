import mongoose from "mongoose";

const companySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    country: String,
    phone: String,
    email: String,
    website: String,
    contact: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "People"
    }
})

export default mongoose.model("Company", companySchema)