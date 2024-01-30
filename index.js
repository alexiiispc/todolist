const express = require("express");
const app = express();

const API = require("./Model/Api.js");
const api = new API()

const bodyParser = require('body-parser');
const cors = require("cors")

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors())


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
    
}); 
app.get("/get-token",(req,res)=>{
    api.generateToken(req,res)
})
app.post("/add-todo",(req,res)=>{
    api.addTodo(req,res)
})
app.post("/get-todo",(req,res)=>{
    api.getTodo(req,res)
})
app.post("/update-todo",(req,res)=>{
    api.updateTodo(req,res)
})


app.listen(3000, () => {
    console.log("server on port 3000");
});
  