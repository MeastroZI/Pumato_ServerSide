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

async function setVerificationCode(data) {
    console.log(data)

    if (await Is_User_In_Db({ Email: data.email, UserName:data.userName ,Verified: true  , AccountType : data.accountType})) {
        return { sucess: false, message: "User with this detail already exists" }
    }
    const client = await getMongoClientInstance()
    const collection = client.db('Pu_Mato').collection('User_Info')
    const indexes = await collection.listIndexes().toArray();
    const isIndexes = indexes.some((obj) => obj.hasOwnProperty('expireAfterSeconds'))
    if (!isIndexes) {
        await collection.createIndex({ expireAt: 1 }, { expireAfterSeconds: 0 })
    }
   
    try {
        const updateResult = await collection.updateOne({ Email: data.email, Verified: false },
            { $set: { Password: data.password, Code: data.code, expireAt: expirationTime  , UserName : data.userName , AccountType : data.accountType} }
        )

        if (updateResult.modifiedCount == 1 ){
            return { sucess: true, message: "sucess" }
        }
        const expirationTime = new Date(Date.now() + 180000);
        const result = await collection.insertOne({
            Email: data.email, Password: data.password, Code: data.code, UserName : data.userName, AccountType : data.accountType ,
            expireAt: expirationTime, Verified: false
        })
        if (result.acknowledged) {
            return { sucess: true, message: "sucess" }
        }
    }
    catch (err) {
        console.log(err)
        return { sucess: false, message: err }
    }

}

module.exports = {
    setVerificationCode
}