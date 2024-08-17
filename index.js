const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()
const app = express()
const cors = require('cors')
const WorkOutRoutes=require('./Routes/WorkoutRoutes.js')
const UserRoutes = require('./Routes/UserRoutes.js')


app.use(express.json())
app.use(cors())


const Port = process.env.PORT ||3000
 

app.use('/api/workouts',WorkOutRoutes)
app.use('/api/user',UserRoutes)


mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    app.listen(Port,()=>{
        console.log('Server is listening on this  Port',Port)
    })
})
.catch((err)=>{
    console.log("Listening error",err)
})
