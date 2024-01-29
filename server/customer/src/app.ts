import expresss from 'express';
import cors from 'cors'
import configMongo from './config/db';
import Routes from './routes/index';
import CheckLogged from './middleware/checklogged';
import CookieParser from 'cookie-parser'

import "dotenv/config"

const port = 5003

// connecting to MongoDB
configMongo?.()

const app = expresss()

app.use(cors({ credentials: true, origin: process?.env?.ORIGIN }))

app.use(expresss.json({ limit: "50mb" }))

app.use(CookieParser())

app.use(CheckLogged)

app.use("/api/", Routes)

app.listen(port, () => {
    console.log("Server Started")
})