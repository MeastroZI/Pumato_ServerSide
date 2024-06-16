require('dotenv').config();
const express = require('express');
const https = require('https')
const bodyParser = require('body-parser')


const fs = require('fs')
const app = express();
const path = require('path');
const PORT = 8000;
const { FechFoodData } = require("./DbFunctions/buyer_side/get_Food_data");
const { Get_Shope_data } = require("./DbFunctions/buyer_side/get_Shope_Data");
const { Get_Shope_Food } = require("./DbFunctions/buyer_side/get_Shope_Food_Items")
const { Fetch_Orders } = require("./DbFunctions/buyer_side/fetch_Food_Orders");
const { Is_User_In_Db } = require('./DbFunctions/Chek_User_In_Db')
const { SignUp } = require('./DbFunctions/New_User')
const { creat_Order } = require('./DbFunctions/seller_side/Make_orders')

const { main_func } = require('./DbFunctions/seller_side/Enter_Food_Item')

const Authentication_Middleware =  (req , res , next) =>{
    if (req.path == '/SignUp' || req.path == "/Imgs"){
        next()
    }
    else {
        console.log(req.body)
        Is_User_In_Db(req.body.userData).then((result)=>{
            
            if (result){
                console.log("user is authenticated")
                next();
            }
            else {
                res.status(403).json({ error: 'Forbidden request' });
                res.end()
            }
        });
    }
}



app.use(bodyParser.json({ limit: '10mb' }));
app.use('/Imgs', express.static(path.join(__dirname, 'Imgs')));
app.use(express.json());
app.use(Authentication_Middleware)

app.get('/', (req, res) => {
    res.send("hellp , express server !");
})

app.post('/GetData', (req, res) => {
    console.log("get the req")
    const UserData = req.body;
    FechFoodData(5).then((result) => {
        res.json(result)
        console.log(result)
        res.end()
    }).catch((err) => {
        console.log(err)
        res.status(404).json({ err: err })
        res.end()
    })
});

app.post('/GetShope', (req, res) => {
    console.log("get the req for shope");
    Get_Shope_data().then((result) => {
        res.json(result)
        res.end()
    }).catch((err) => {
        console.log(err)
        res.status(404).json({ err: err })
        res.end()
    })

});

app.post('/Get_Shope_Items', (req, res) => {
    const ShopeName = req.body.Name
    Get_Shope_Food(ShopeName).then((data) => {
        res.json(data)
        res.end()
    }).catch((err) => {
        res.status(404).json({ error: err })
        res.end()
    })
})

app.post('/Set_Food_Items', (req, res) => {
    console.log("get the req")
    // {

    //     userData: {
    //         UserName: 'test',
    //         Password: 'Password',
    //         Account_Type: 'Buyer',
    //     },
    //     reqData : {
    //         image: imagedata,

    //     }

    // }
    const body = req.body.reqData ;
    const result = main_func(body)
    res.json({ sucess: result })
    res.end()
})

// app.post('/Login', (req, res) => {
//     const userData = req.body
//     Is_User_In_Db(userData).then((result) => {
//         console.log(result)
//         if (result) {
//             res.json({ sucess: result })
//             res.end()
//         }
//         else {
//             res.status(400).json({ error: "Authentication fail" })
//             res.end()
//         }
//     }).catch((err) => {
//         res.status(404).json({ error: err })
//         res.end()
//     })
// })


app.post('/SignUp', (req, res) => {
    const userData = req.body
    SignUp(userData).then((result) => {
        console.log(result)
        if (result.sucess) {
            res.json(result)
            res.end()
        }
        else {
            res.status(404).json({ error: result.Msg })
            res.end()
        }
    }).catch((err) => {
        res.status(404).json({ error: err })
        res.end()
    })
})

app.post('/Fetch_Orders', (req, res) => {
    const userData = req.body
    Fetch_Orders(userData).then((result) => {
        res.json(result)
        res.end()
    }).catch((err) => {
        res.status(404).json({ error: err })
        console.log(err)
        res.end()
    })
})

app.post('/Make_Order' , (req , res)=>{
    creat_Order(req.body).then((result)=>{
        res.json(result)
        res.end()
    }).catch((err)=>{
        res.status(404).json({error:err})
        console.log(err)
        res.end()
    })
})

const server = app;

server.listen(PORT, () => {
    console.log(`https server is runnin on ${PORT}`)
})




