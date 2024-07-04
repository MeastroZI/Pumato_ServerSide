require('dotenv').config();
const express = require('express');
const https = require('https')
const bodyParser = require('body-parser')
const nodemailer = require('nodemailer');
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
const { getToken } = require('./utils/getToken')
const { enterFoodItem } = require('./DbFunctions/seller_side/Enter_Food_Item')
const { setVerificationCode } = require('./DbFunctions/setUserVerification')
const { setUserNameInDB } = require('./DbFunctions/setUserName')
const { make_Order} = require('./DbFunctions/buyer_side/makeOrder')

const Authentication_Middleware = (req, res, next) => {
    if (req.path == '/SignUp' || req.path == "/Imgs" || req.path == "/SendMail") {
        next()
    }
    else {
        console.log(req.path)
        console.log(req.body)
        const userData = req.body.UserData
        Is_User_In_Db({ Email: userData.email, Password: userData.password }).then((result) => {

            if (result) {
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
    const body = req.body.reqData;
    const result = main_func(body)
    res.json({ sucess: result })
    res.end()
})

app.post('/Login', (req, res) => {
    const userData = req.body.UserData
    Is_User_In_Db({Email:userData.email , Password : userData.password , AccountType : userData.accountType}).then((result) => {
        console.log(result)
        if (result) {
            res.json({ sucess: result })
            res.end()
        }
        else {
            res.status(400).json({ error: "Authentication fail" })
            res.end()
        }
    }).catch((err) => {
        res.status(404).json({ error: err })
        res.end()
    })
})


app.post('/SignUp', (req, res) => {
    console.log(req.body)
    const userData = req.body
    console.log("recive")
    SignUp(userData).then((result) => {
        console.log(result)
        if (result.sucess) {
            res.json(result)
            res.end()
        }
        else {
            res.status(404).json({ error: result.message })
            res.end()
        }
    }).catch((err) => {
        console.log(err)
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

app.post('/Make_Order', (req, res) => {
    creat_Order(req.body).then((result) => {
        res.json(result)
        res.end()
    }).catch((err) => {
        res.status(404).json({ error: err })
        console.log(err)
        res.end()
    })
})


/* {
    email: ******,
    password : *********
}*/

app.post('/SendMail', async (req, res) => {
    console.log(req.body)
    const verficationCode = getToken();
    const result = await setVerificationCode({ ...req.body, code: verficationCode })
    if (result.sucess) {

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.SERVER_EMAIL,  // Your email address
                pass: process.env.SERVER_MAIL_PASSWORD // Your email password or app-specific password
            }
        });

        const targetMail = req.body.email
        const mailOptions = {
            from: process.env.SERVER_EMAIL,  // Sender address
            to: targetMail,   // List of recipients
            subject: 'Verfication code for Pu-Mato',         // Subject line
            text: `This is the One time password for the verfication of your account this is valid for 2min ${verficationCode}`
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Error occurred:', error.message);
                res.status(501).json({ sucess: false, message: error.message })
                return;
            }
            else {
                res.json({ sucess: true, message: "Sucess" })
                console.log('Message ID:', info.messageId);
                console.log('Email sent successfully!');
            }
        });
    }
    else {
        console.log(result)
        res.status(501).json(result)
    }
})

app.post('/setUserName', async (req, res) => {
    if (req.body && req.body.userName && ! await Is_User_In_Db({ UserName: req.body.userName })) {
        const result = await setUserNameInDB(req.body)
        if (!result.sucess) {
            res.status(501)
        }
        res.json(result)
        res.end()

    }
    else {
        res.status(501).json({sucess : false  , message : "UserName is already taken"})
    }

})

app.get('/getFoodItemById' , async (req , res)=>{
    const result = getFoodItemById(req.body.Id)
    res.json(result)
})

app.post('/MakeOrders' , async (req , res)=>{
    const result = make_Order(req.body)
})

app.post('/AddFoodItem' , async(req , res)=>{
    if(enterFoodItem(req.body)){
        res.json({sucess:true})
    }
    else 
    {
        res.json({sucess : false , message : 'something is wrong'})
    }
})


const server = app;

server.listen(PORT, () => {
    console.log(`https server is runnin on ${PORT}`)
})