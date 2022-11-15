import express from "express"
import morgan from "morgan"
import cors from 'cors'

const app = express()

app.use(cors())
app.use(morgan('dev'))

app.use(express.json({ limit: '50mb' }))
app.use(express.urlencoded({ limit: '50mb', extended: false }))


export default app