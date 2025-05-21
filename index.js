import express from 'express'
const app = express()
import dotenv from 'dotenv'
dotenv.config()
import cors from 'cors'
import connectDB from './Utils/db.js'
import userRoutes from './Routes/user.route.js'
import postRoutes from './Routes/post.route.js'
import cookieParser from 'cookie-parser'

app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended: true}))
const corsOptions = {
    origin: 'http://localhost:5173/',
    credentials: true
}
app.use(cors(corsOptions))


// api's
app.use('/api/users', userRoutes)
app.use('/api/posts', postRoutes)

app.get('/' , (req , res)=>{
    res.send('okay')
})

const PORT = process.env.PORT || 7000

app.listen(PORT , ()=>{
      connectDB()
      console.log(`your server is runnit at http://localhost:${PORT}`)
})
