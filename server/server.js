import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import contacts from './db.js';
// dotenv.config({path: './config/config.env'});
const app = express();
app.use(express.json());
app.use(cors());

app.get('/',(req,res) => res.send('active'));
const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server running in port ${PORT}`))

// create contact
app.post('/contacts',async(req,res)=>{
    try{
        const {contactname, phonenumber} = req.body;
        const newContact = await contacts.query("INSERT INTO contacts (contactname,phonenumber) VALUES($1,$2)",[contactname , phonenumber]);
        res.json(newContact)
    } catch(err){
        console.log(err.message);
    }
})

// update contact


// delete contact


// read all contact 