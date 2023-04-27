import functions from "firebase-functions"
import express from "express"
import cors from "cors"
import { login, signup } from "./src/users.js"
import { getShows, addShow } from "./src/shows.js"


const app = express()//creates our express app, parenthesis invokes it
app.use(cors()) // pink parenthesis invokes it
app.use(express.json())// run and invoke these

//User routes:
app.post("/signup", signup)
app.post("/login", login)

//Show routes:
app.get("/shows", getShows)
app.post("/shows", addShow)

app.listen(3000, () => console.log(`Listening on http://localhost:3000`))
//use to test locally without using firebase emulators

export const api = functions.https.onRequest(app) //exports our cloud function,
//runs emulators


