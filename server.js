//DECLARING VARIABLES
const express = require("express");
const app = express();
const admin = require("firebase-admin");
const credentials = require("./key.json");

//INITIALIZING CREDENTIALS IN THE ARQUIVE KEY.JSON
admin.initializeApp({
    credential: admin.credential.cert(credentials)
});

//CONFIGURING SERVER INTO DE PORT 8080
const db = admin.firestore();
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//MODIFY THIS SECTION TO CHANGE THE PORT OF SERVER
const PORT = process.env.PORT || 8080;
app.listen(PORT, ()=>{
    console.log(`SERVER IS RUNNING ON PORT ${PORT}`)
})

//FUNCTIONS 

//CREATE
app.post('/create', async (req, res) =>{
    try{        
        console.log(req.body);
        const id = req.body.email;
        const   userJson = {
            email: req.body.email,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
        }
        const response = await db.collection("users").add(userJson);
        res.send(response)
    }catch(error){
        res.send(error)
    }
})

//READ
app.get('/read/:id',async (req, res)=>{
    try{
        const userRef = db.collection("users").doc(req.params.id);
        const response = await userRef.get();
        res.send(response.data());
    }catch(error){
        res.send(error)
    }
})

//READ
app.get('/read',async (req, res)=>{
    try{
        const userRef = db.collection("users");
        const response = await userRef.get();
        res.send(response.data());
    }catch(error){
        res.send(error)
    }
})

//UPDATE
app.post('/update', async(req, res)=>{
    try{
        const id=req.body.id;
        const newFirstName = "hello world";
        const userRef = await db.collection("users").doc(id).update({
            firstName: newFirstName
        });
        res.send(userRef);
    }catch(error){
        res.send(error)
    }
})

//DELETE
app.delete('/delete/:id', async(req, res)=>{
    try{
        const userRef = await db.collection("users").doc(req.params.id).delete()
        res.send(userRef);
    }catch(error){
        res.send(error)
    }
})
