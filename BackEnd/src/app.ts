import express, {  Request, Response } from 'express'
import bodyparser from 'body-parser'
import { PostgresDataSource } from './configs/db'
import studentRouter from './routes/studentRoutes'
import userRouter from './routes/userRoutes'
import http from 'http'
import { Server } from 'socket.io'
import cors from 'cors'
const verifyJWT = require('./middlewares/verifyJwt')
const cookieParser = require('cookie-parser')
const credentials = require('./middlewares/credentials')
const corsOptions = require('./configs/corsOptions')

const app = express()

// app.use(credentials)

// app.use(cors(corsOptions))
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true}
))

app.use(bodyparser.json())
app.use(
  bodyparser.urlencoded({
    extended: true,
  })
)

// middleware for cookies
app.use(cookieParser())

//socket io
const server = http.createServer(app)
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  },
})


io.on("connection", (socket) => {
  console.log('a user connected', socket.id)

  socket.on('user_added', (data) => {
    console.log('user_added', data)
    socket.broadcast.emit('user_added', data)
  })
  socket.on('user_updated', (data) => {
    console.log('user_updated', data)
    socket.broadcast.emit('user_updated', data)
  })
  socket.on('user_removed', (data) => {
    console.log('user_removed', data)
    socket.broadcast.emit('user_removed', data)
  })
})
 

PostgresDataSource.initialize()
    .then(() => {
        console.log("Data Source has been initialized!")
    })
    .catch((err) => {
        console.error("Error during Data Source initialization", err)
    })


app.use('/', userRouter)

app.use(verifyJWT) // running the verifyJWT middleware for the home route
app.use('/home', studentRouter)

app.use((err: any, req: Request, res: Response) => {
  const statusCode = err.statusCode || 500
  console.error(err.message, err.stack)
  res.status(statusCode).json({ message: err.message })
  return 
})

//app.listen
server.listen(3001, () => {
  console.log('The application is listening on port 3001!')
})
