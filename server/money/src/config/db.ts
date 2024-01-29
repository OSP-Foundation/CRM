import mongoose from "mongoose";
import "dotenv/config"

const url: string = process?.env?.DB_URL || ""

const configMongo = async (): Promise<void> => {
    try {
        await mongoose.connect(url, {
            dbName: "CRM"
        })

        console.log("MongoDB Connected")
    } catch (err) {
        console.log("MongoDB Connect Failed")
    }
}

export default configMongo