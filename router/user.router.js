var express = require("express");
var pool = require("../connection");

var app = express();
app.use(express.json());

var router = express.Router();

router.post("/auth", (req, res) => {
  var username = req.body.username;
  var password = req.body.password;

  pool.query(
    `SELECT * FROM USER WHERE username =?`,
    [username],
    (err, rows) => {
      if (err) throw err;
      if (rows.length > 0) {
        if (password === rows[0].password) {
          const userId = rows[0].id;
          const token = '9841595448';
          console.log("token", token);
          pool.query(
            `INSERT INTO token (token,userid,status) VALUES('${token}',${userId},1)`
          ),
            (err, rows) => {
              if (err) throw err;
 
            };''
          res.send("Authentication Successful");
        } else {
          res.send("Username/Password incorrect");
        }
      } else {
        res.send({ message: "User not found", status: 200 });
      }
    }
  );
});

router.get("/logout", (req, res) => {
  const userid = req.query.userid[0];
  console.log('userid',userid);
  const status = 0;
  pool.query(
    `UPDATE token SET status =0 WHERE userid =${userid}`,
    (err, rows) => {
      if (err) throw err;
      res.send({
        msg: "logout Success",
      });
    }
  );
});

module.exports = router;
