const {getMongoClientInstance } = require('./get_Db_Connection')
const fs = require('fs')
const path = require('path')




async function SignUp(userData) { 
    const client = await getMongoClientInstance()
    const collection = client.db('Pu_Mato').collection('User_Info')
    const IsUserNameExits = await collection.countDocuments({ Name: userData.UserName})
    if ( IsUserNameExits >0) { 
        return {sucess : false , Msg: "User Name Alredy exits"}
    }
    else {
        const result = await collection.insertOne({Name:userData.UserName , Password: userData.Password, AccountType: userData.AccountType})
        console.log(result)
        if (result.acknowledged ) {
            return {sucess: true }
        }
        else {
            return {sucess: false , Msg : "Error while inserting the User data" }
        }
    }

}

module.exports = {
    SignUp
}