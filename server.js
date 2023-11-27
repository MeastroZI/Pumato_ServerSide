const express = require('express') ;
const ShopeArr = require("./Shope_Detail")
const app = express();
const path = require('path');
const PORT = 8000 ;
let IDReached  = 0 ;
let food_data = [
    { Name: "Dabeli1", discription: "Lorem ipsum dolor, sit amet consectetur  ", price: 1000, Place: "Pit", URL:'http://192.168.1.11:8000/Imgs/Img1.jpeg'  },

    { Name: "Dabeli2", discription: "Lorem ipsum dolor, sit amet consectetur  ", price: 10, Place: "Pit", URL :'http://192.168.1.11:8000/Imgs/Img2.jpeg'   },

    { Name: "Dabeli3", discription: "Lorem ipsum dolor, sit amet consectetur  ", price: 1000, Place: "Piet", URL: 'http://192.168.1.11:8000/Imgs/Img3.jpeg'   },

    { Name: "Dabeli4", discription: "Lorem ipsum dolor, sit amet consectetur  ", price: 100, Place: "Piet", URL: 'http://192.168.1.11:8000/Imgs/Img4.jpeg'   },

    { Name: "Dabeli5", discription: "Lorem ipsum dolor, sit amet consectetur  ", price: 100000, Place: "Piet", URL: 'http://192.168.1.11:8000/Imgs/Img5.jpeg'   },
]

app.use('/Imgs' , express.static(path.join(__dirname , 'Imgs'))) ;

app.get('/' , (req , res)=>{
    res.send("hellp , express server !");
})

app.get('/GetData', (req, res) => {
    console.log("get the req")
    assignIdToData();
    res.json(food_data);
    res.end()
  });

app.post('/GetShope', (req , res)=>{
    console.log("get the req for shope");
    res.json(ShopeArr);
    res.end;

})
  
app.listen(PORT , ()=>{
    console.log(`server is runnin on ${PORT}`)
})

function assignIdToData(){
    food_data.forEach((itm)=>{
        itm.id = IDReached ;
        IDReached = IDReached+1 ;
    })
}