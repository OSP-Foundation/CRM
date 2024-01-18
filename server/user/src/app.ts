import expresss from 'express';
import cors from 'cors'
import configMongo from './config/db';
import Routes from './routes/index';
import cookieParser from 'cookie-parser'

import "dotenv/config"

const port = 5001

// connecting to MongoDB
configMongo?.()

const app = expresss()

app.use(cors({ credentials: true, origin: process?.env?.ORIGIN }))

app.use(expresss.json({ limit: "50mb" }))

app.use(cookieParser())

app.use("/api/", Routes)

app.listen(port, () => {
    console.log("Server Started")
})