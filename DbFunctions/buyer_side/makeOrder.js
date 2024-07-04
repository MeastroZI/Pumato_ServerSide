const { getMongoClientInstance } = require('../get_Db_Connection')
const fs = require('fs')
const path = require('path')



async function make_Order(userData) {
    const client = await getMongoClientInstance()
    const collection = client.db('Pu_Mato').collection('Orders')
    const obj = { Email: userData.email, Quantity : userData.quantity , ItemID : userData.Id , From : userData.UserData.UserName , To : userData.To}
    const result = await collection.insertOne(obj);
    
    console.log(result)
    if (result.insertCount > 0) {
        return { sucess: true, message: "sucess" }
    }
    else {
        return { sucess: false, message: "Something is wrong" }
    }



}

module.exports = {
    make_Order
}