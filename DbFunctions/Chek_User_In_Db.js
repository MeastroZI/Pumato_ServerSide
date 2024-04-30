const {getMongoClientInstance } = require('./get_Db_Connection')
const fs = require('fs')
const path = require('path')

// {
//     _id: ObjectId('662f49bf4207ef6334c934e2'),
//     UserName: 'test',
//     Password: 'Password',
//     Account_Type: 'Buyer'
//   }
async function Is_User_In_Db(data){
    const client = await getMongoClientInstance()
    const collection = client.db('Pu_Mato').collection('User_Info')
    const result = await collection.countDocuments({Account_Type : data.Account_Type , UserName : data.UserName , Password: data.Password})
    console.log(result)
    await client.close()
    return result == 1 
}

module.exports = {
    Is_User_In_Db
}