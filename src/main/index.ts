import '../main/config/module-alias'
import * as dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import { PORT } from './config'

const app = express()
app.use(express.json())

app.listen(PORT, () => console.log('Running on port: ' + PORT))