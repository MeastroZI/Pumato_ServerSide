const { getMongoClientInstance } = require('./get_Db_Connection')
const fs = require('fs')
const path = require('path')
const { Is_User_In_Db } = require('./Chek_User_In_Db')



async function SignUp(userData) {
    const client = await getMongoClientInstance()
    const collection = client.db('Pu_Mato').collection('User_Info')
    const result = await collection.updateOne(
        { Email: userData.email, Password: userData.password, Code: userData.code },
        {
            $unset: { expireAt: '', Code: '' }, // $unset to remove fields
            $set: {  
                AccountType : userData.accountType,
                Verified : true 
            } // $set to update or set another field
        }
    );

    console.log(result)
    if (result.modifiedCount > 0) {
        return { sucess: true, message: "sucess" }
    }
    else {
        return { sucess: false, message: "Otp Expire" }
    }



}

module.exports = {
    SignUp
}