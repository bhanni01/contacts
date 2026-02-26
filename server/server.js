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

app.delete('/delete/:cid', async(req,res)=>{
    try{
        const { cid } = req.params;
        const value = await contacts.query("DELETE FROM contacts WHERE cid = $1 RETURNING *",[cid])
        res.status(200).json(value.rows)
    } catch (err){
        console.log(err.message)
    }
})
// read all contact 
app.get('/contacts', async(req,res)=>{
    try{
        const value = await contacts.query("SELECT * FROM contacts;")
        res.status(200).json(value.rows)
    } catch(err){
        console.log(err.message)
    }
    
})

// get a contact 
app.get('/contacts/:cid', async(req,res)=>{
    try{
        const { cid } = req.params;
        const value = await contacts.query("SELECT cid, contactname, phonenumber FROM contacts WHERE cid = $1", [cid]);
        if (value.rows.length === 0){
            return res.status(404).json({error:"Contact empty"})
        }
        return res.json(value.rows[0])
    } catch (err) {
        console.log(err.message)
    }
})