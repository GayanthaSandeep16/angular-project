const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");
const server = express();
server.use(bodyParser.json());
const cors = require("cors");
server.use(cors());


// Create connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "studentdb",
});

db.connect((err) => {
  if (err) {
    console.log("Error connecting to Db");
    console.log(err);
  } else {
    console.log("MySql Connected...");
  }
});


//port creation
server.listen(8085, (err) => {
  if (err) {
    console.log("Error connecting to server");
    console.log(err);
  } else {
    console.log("Server Connected...");
  }
});


//create record
server.post("/api/student/add", (req, res) => {
  let details = {
    stname: req.body.stname,
    birthday: req.body.birthday,
    address: req.body.address,
    phone_no: req.body.phone_no,

    email: req.body.email,
  };
  let sql = "INSERT INTO student SET ?";
  db.query(sql, details, (err) => {
    if (err) {
      res.send({ status: false, message: err });
      res.send({ status: false, message: "Error adding student" });
    } else {
      res.send({ status: true, message: "Student added successfully" });
    }
  });
});


// view all records
server.get("/api/student/get", (req, res) => {
  var sql = "SELECT * FROM student";
  db.query(sql, (err, result) => {
    if (err) {
      res.send({ status: false, message: "Error fetching student" });
    } else {
      res.send({
        status: true,
        message: "Student fetched successfully",
        data: result,
      });
    }
  });
});



//update record
server.put("/api/student/update/:id", (req, res) => {
  let sql =
    "UPDATE student SET stname" +
    "='" +
    req.body.stname +
    "',birthday='" +
    req.body.birthday +
    "',address='" +
    req.body.address +
    "',phone_no" +
    "='" +
    req.body.phone_no +
    "',email='" +
    req.body.email +
    "' WHERE id=" +
    req.params.id;

  let query = db.query(sql, (err, result) => {
    if (err) {
      res.send({ status: false, message: "Error updating student" });
    } else if (result.affectedRows === 0) {
      res.send({ status: false, message: "Record not found" });
    } else {
      res.send({ status: true, message: "Student updated successfully" });
    }
  });
});



//delete record
server.delete("/api/student/delete/:id", (req, res) => {
  let sql = "DELETE FROM student WHERE id=" + req.params.id + "";
  let query = db.query(sql, (err, result) => {
    if (err) {
      res.send({ status: false, message: "Error deleting student" });
    } else {
      res.send({ status: true, message: "Student deleted successfully" });
    }
  });
});
