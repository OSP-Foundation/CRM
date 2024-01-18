import expresss from 'express';
import cors from 'cors'
import Routes from './routes/index';
import "dotenv/config"

const port = 5002

const app = expresss()

app.use(cors({ credentials: true, origin: "*" }))

app.use(expresss.json({ limit: "50mb" }))

app.use("/api/", Routes)

app.listen(port, () => {
    console.log("Server Started")
})