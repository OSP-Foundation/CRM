import mongoose from "mongoose";

const customerSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true
    },
    client: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true
    }
})

export default mongoose.model("Customer", customerSchema);