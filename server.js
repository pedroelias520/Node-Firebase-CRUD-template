const express = require("express");
const app = express();

const admin = require("firebase-admin");
const credentials = require("./key.json");

admin.initializeApp({
    credential: admin.credential.cert(credentials)
});

app.post('/create', async(req, res)=>{
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

const db = admin.firestore();
app.use(express.json());
app.use(express.urlencoded({extended: true}));

const PORT = process.env.PORT || 8080;

app.listen(PORT, ()=>{
    console.log(`SERVER IS RUNNING ON PORT ${PORT}`)
})