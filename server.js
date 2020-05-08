var express = require ('express');
var pool = require('./connection');
var app = express();

var router = express.Router();

app.get('/',(req,res)=>{
    pool.query(`SELECT * FROM USER`,(err,rows)=>{
        if (err)throw err;
        res.send ({
            "data":rows
        })
    })
   
})








app.listen(3000,()=>{
    console.log ("Server running at port 3000");
})