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
    if (!data) {
        return false
    }
    

    
    const client = await getMongoClientInstance()
    // console.log(data)
    
    const collection = client.db('Pu_Mato').collection('User_Info')
    const result = await collection.find(data).toArray()
    // const user = await result.toArray()
    console.log(result)
    console.log(result.length == 1)
    await client.close()
    return result.length == 1 
}

module.exports = {
    Is_User_In_Db
}