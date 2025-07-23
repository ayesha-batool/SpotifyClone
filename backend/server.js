
// Import express framework
import express from 'express'
// Import CORS middleware to allow cross-origin requests
import cors from 'cors'
// Import dotenv to load environment variables from .env file
import 'dotenv/config'
import songRouter from './src/routes/songRoute.js'
import connectDB from './src/config/mongodb.js'
import connectCloudinary from './src/config/cloudinary.js'
import albumRouter from './src/routes/albumRoute.js'

// app config
// Create an Express application
const app=express()
// Set the port from environment variable or default to 4000
const port=process.env.PORT || 4000

// Connect to MongoDB
console.log('Connecting to MongoDB...')
connectDB()
// Connect to Cloudinary
console.log('Connecting to Cloudinary...')
connectCloudinary()

// middleware
// Parse incoming JSON requests
app.use(express.json())
// Enable CORS for all routes (connect frontend with backend)
app.use(cors()) //connect front with backend

// initializing routers
console.log('Registering /api/song route...')
app.use("/api/song", (req, res, next) => {
  console.log(`[${new Date().toISOString()}] /api/song request:`, req.method, req.url)
  next()
}, songRouter)
app.use("/api/album", (req, res, next) => {
    console.log(`[${new Date().toISOString()}] /api/album request:`, req.method, req.url)
    next()
  }, albumRouter)
// Define a simple route for the root URL
app.get('/',(req,res) => {
  console.log(`[${new Date().toISOString()}] / root request`)
  res.send("API working")
})

// Start the server and listen on the specified port
app.listen(port,()=>console.log("server starter",port))