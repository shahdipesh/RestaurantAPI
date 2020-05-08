var express = require ('express');
var pool = require('../connection');
var router =express.Router();
var app = express();

app.use(express.json());

router.get('/all',(req,res)=>{
    const token = req.query.token[0];
    console.log ("token",token);
pool.query(
    `SELECT * FROM token WHERE token ='${token}'`,(err,rows)=>{
     if (err)throw err;
     console.log ("rows",rows);
     if(rows.length > 0 && rows[0].status === 1){
        pool.query(
            `SELECT * FROM menu `,(err,rows)=>{
                if (err) throw err;
               return res.send (rows);
            })
     } else{
        res.send ('Invalid token');
     }
  
    }
)

})

module.exports=router;