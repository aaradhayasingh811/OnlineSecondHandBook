import dotenv from "dotenv"
dotenv.config({
    path: './.env'
})

import app from "./app.js"
import {connection} from "../backend/connection/db.js"

connection().then(()=>{
    app.listen(process.env.PORT || 5000,()=>{
        console.log('server is running on port',process.env.PORT);
    })}).catch(()=>{
    console.log("Database connection failed")
})