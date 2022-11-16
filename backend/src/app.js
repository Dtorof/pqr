import express from "express"
import morgan from "morgan"
import cors from 'cors'
import { errorRouter } from "./routes/error404.route.js"
import { registerRouter } from "./routes/register_pqr.route.js"
import { responseRouter } from "./routes/response_pqr.route.js"
import { traceabilityRouter } from "./routes/traceability.route.js"
import { completeRouter } from "./routes/complete_pqr.route.js"

const app = express()

app.use(cors())
app.use(morgan('dev'))

app.use(express.json({ limit: '50mb' }))
app.use(express.urlencoded({ limit: '50mb', extended: false }))

app.use('/api/v1/complete-pqr', completeRouter)
app.use('/api/v1/traceability', traceabilityRouter)
app.use('/api/v1/register-pqr', registerRouter)
app.use('/api/v1/response-pqr', responseRouter)
app.use('*', errorRouter)

export default app