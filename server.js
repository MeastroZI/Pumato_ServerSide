const express = require('express') ;
const https = require('https')

const fs = require('fs')
const app = express();
const path = require('path');
const PORT = 8000 ;
const {Get_Food_data} = require ("./DbFunctions/get_Food_data") ;
const {Get_Shope_data} = require ("./DbFunctions/get_Shope_Data");
const {Get_Shope_Food} = require ( "./DbFunctions/get_Shope_Food_Items")
const {Fetch_Orders} =require ("./DbFunctions/fetch_Food_Orders");
const {AssignIdToData} = require("./utils/assingIdToData")
const {Autherize} = require ("./utils/Authentication")


app.use('/Imgs' , express.static(path.join(__dirname , 'Imgs'))) ;
app.use(express.json());


app.get('/' , (req , res)=>{
    res.send("hellp , express server !");
})

app.post('/GetData', (req, res) => {
    console.log("get the req")
    const UserData = req.body ;
    if (Autherize(UserData)){

        let food_data = Get_Food_data () ;
        AssignIdToData(food_data);
        res.json(food_data);
        res.end()
    }
    else {
        res.status(401).json({error : "you are unautherize"})
    }
  });

app.post('/GetShope', (req , res)=>{
    console.log("get the req for shope");
    const UserData = req.body ;
    if (Autherize(UserData)) {
        const ShopeData = Get_Shope_data() ; 
        res.json(ShopeData);
        res.end;
        
    }
    else {
        res.status(401).json({error : "you are unautherize"})
    }

}) ;

app.post('/Fetch_Orders' , (req , res)=>{
    const UserData = req.body ;
    console.log (UserData)
    if (Autherize(UserData)) {

        const food_Orders = Fetch_Orders () ;
        res.json(food_Orders ) ;
        res.end ;
        
    }
    else {
        res.status(401).json({error : "you are unautherize"})
    }
}) ;

app.post('/Get_Shope_Items' , (req , res)=>{
    const ShopeItems = Get_Shope_Food (ShopeId) ;
    res.json (ShopeItems) ;
    res.end;
})





const server = app;

server.listen(PORT , ()=>{
    console.log(`https server is runnin on ${PORT}`)
})

