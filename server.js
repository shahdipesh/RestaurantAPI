var express = require ('express');
var user = require('./router/user.router');
var menu =require('./router/menu.router');

var app = express();
app.use(express.json());

app.use('/user',user);
app.use('/menu',menu);

app.listen(3000,()=>{
    console.log ("Server running at port 3000");
})