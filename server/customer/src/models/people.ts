import mongoose from "mongoose";

const peopleSchema = new mongoose.Schema({
    user: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    country: String,
    phone: String,
    email: String,
    company: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Company"
    }
})

export default mongoose.model("People", peopleSchema)