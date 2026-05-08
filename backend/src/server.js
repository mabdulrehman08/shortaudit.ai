import 'dotenv/config'
import cors from 'cors'
import express from 'express'
import helmet from 'helmet'
import aiRoutes from './routes/aiRoutes.js'

const app = express()
const port = process.env.PORT || 8080
const frontendOrigin = process.env.FRONTEND_ORIGIN || 'http://localhost:5173'

app.use(helmet())
app.use(cors({ origin: frontendOrigin === '*' ? true : frontendOrigin }))
app.use(express.json({ limit: '1mb' }))

app.get('/health', (_req, res) => {
  res.json({ ok: true, service: 'ShortAudit AI API' })
})

app.use('/api', aiRoutes)
app.use(aiRoutes)

app.use((error, _req, res, _next) => {
  if (error.name === 'ZodError') {
    return res.status(400).json({ message: 'Invalid request payload', issues: error.issues })
  }

  console.error(error)
  return res.status(500).json({ message: 'AI analysis failed. Please try again.' })
})

app.listen(port, () => {
  console.log(`ShortAudit AI API listening on ${port}`)
})
