var express = require ('express');
var pool = require('../connection');

var app=express();
app.use(express.json());

var router = express.Router();



router.post('/auth/',(req,res)=>{
    
    var username = req.body.username;
   var password =req.body.password;
   pool.query(
       `SELECT * FROM USER WHERE username =?`,[username],(err,rows)=>{
           if (err) throw err;
           if (password===rows[0].password){
               res.send ("Authentication Successful");
           }
           else{
               res.send ("Username/Password incorrect");
           }
       }
   )
})



module.exports = router;

