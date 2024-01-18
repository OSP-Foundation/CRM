import expresss from 'express';
import cors from 'cors'
import configMongo from './config/db';
import Routes from './routes/index';
import "dotenv/config"

const port = 5003

// connecting to MongoDB
configMongo?.()

const app = expresss()

app.use(cors({ credentials: true, origin: "*" }))

app.use(expresss.json({ limit: "50mb" }))

app.use("/api/", Routes)

app.listen(port, () => {
    console.log("Server Started")
})