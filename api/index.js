const express = require('express');
const app = express();
const mysql = require('mysql2');
const cors = require('cors');
require('dotenv').config();
const port = process.env.PORT || 4242
const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"12345678",
    database:"bookstore"
});
app.use(express.json());
app.use(cors());
app.listen(port ,()=>{
    console.log(`app is listening at port ${port}`)
})
app.get('/',(req,res)=>{
    res.json({success:true});
})

app.get('/books',(req,res)=>{
    const q = 'SELECT * FROM books';
    db.query(q,(err,data)=>{
        if(err){
            return res.json({error:err.message});
        }
        return res.json({data:data});
    })
})

app.post('/books',(req,res)=>{
     const q = "INSERT INTO books (`title`,`description`,`cover`,`price`) VALUES(?)"
     const values = [req.body.title,req.body.description,req.body.cover,req.body.price];
     db.query(q,[values],(err,data)=>{
            if(err) return res.json({err:err.message})
            res.json({success:true,data:data});
     })
})

app.delete('/books/:id',(req,res)=>{
    const {id} = req.params;
    const q = "DELETE FROM books WHERE id = ?"
    db.query(q,[id],(err,data)=>{
        if(err) return res.json({success:false,error:err.message});
        return res.json({success:true});
    })
}) 

app.put('/books/:id',(req,res)=>{
    const {id} = req.params;
    const q = "UPDATE books SET `title` = ?, `description` = ?, `cover` = ?, `price` = ? WHERE id = ?"
    const values = [
        req.body.title,
        req.body.description,
        req.body.cover,
        req.body.price
    ]
    db.query(q, [...values,id],(err,data)=>{
        if(err) return res.json({err:err.message});
        return res.json({success:true});
    })
})