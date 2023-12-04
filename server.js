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


let IDReached  = 0 ;


app.use('/Imgs' , express.static(path.join(__dirname , 'Imgs'))) ;

app.get('/' , (req , res)=>{
    res.send("hellp , express server !");
})

app.get('/GetData', (req, res) => {
    console.log("get the req")
    let food_data = Get_Food_data () ;
    assignIdToData(food_data);
    res.json(food_data);
    res.end()
  });

app.post('/GetShope', (req , res)=>{
    console.log("get the req for shope");
    const ShopeData = Get_Shope_data() ; 
    res.json(ShopeData);
    res.end;

}) ;

app.post('/Fetch_Orders' , (res , req)=>{
    const food_Orders = Fetch_Orders () ;
    res.json(food_Orders ) ;
    res.end ;
})





const server = app;

server.listen(PORT , ()=>{
    console.log(`https server is runnin on ${PORT}`)
})

function assignIdToData(food_data){
    food_data.forEach((itm)=>{
        itm.id = IDReached ;
        IDReached = IDReached+1 ;
    })
}