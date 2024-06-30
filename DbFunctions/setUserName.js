const { getMongoClientInstance } = require('./get_Db_Connection')
const fs = require('fs')
const path = require('path')
const { Is_User_In_Db } = require('./Chek_User_In_Db')
const { Code } = require('mongodb')

// {
//     _id: ObjectId('662f49bf4207ef6334c934e2'),
//     UserName: 'test',
//     Password: 'Password',
//     Account_Type: 'Buyer'
//   }

async function setUserNameInDB(data) {

    if (await Is_User_In_Db({ UserName: data.userName })) {
        return { sucess: false, message: "UserName is already taken" }
    }
    const client = await getMongoClientInstance()
    const collection = client.db('Pu_Mato').collection('User_Info')
    
    try {
        
        const updateResult = await collection.updateOne({ Email: data.UserData.email, Password : data.UserData.password},
            { $set: {UserName: data.userName } }
        )
        if (updateResult.modifiedCount == 1 ){
            return { sucess: true, message: "sucess" }
        }
        else {
            return {sucess : false , message : "user not found"}
        }
    }
    catch (err) {
        console.log(err)
        return { sucess: false, message: err }
    }

}

module.exports = {
    setUserNameInDB
}