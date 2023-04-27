import { FieldValue } from "firebase-admin/firestore"
import { db } from "./dbConnect.js"

const collection = db.collection("users")

export async function signup(req, res) {
    const { email, password } = req.body
    if(!email || !password) {
        res.status(400).send({ message: "Email and password are both required."})
        return // this is validation
    }
    //need email and password from body
    // TODO: check if email is already in use
    const newUser = {
        email: email.toLowerCase(),
        password,
        createdAt: FieldValue.serverTimestamp(),
    }
    await collection.add(newUser)//this makes a promise
    login(req, res)
    //add JWT next week
}

export async function login(req, res) {
    const { email, password } = req.body
    if(!email ||!password) {
        res.status(400).send({ message: "Email and password are both required."})
        return
    }
    const users = await collection
    .where("email", "==", email.toLowerCase())
    .where("password", "==", password)
    .get()
   let user = users.docs.map(doc => ({...doc.data(), id: doc.id}))[0] // have to do this all the time in FireStore
    if(!user) {
        res.status(400).send({ message: "Invalid email and/or password." })
        return 
    }    
   delete user.password
    res.send(user) // { email, createdAt, id }
    }