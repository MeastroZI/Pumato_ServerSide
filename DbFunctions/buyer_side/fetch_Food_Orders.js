const {getMongoClientInstance} = require('../get_Db_Connection')


async function Fetch_Orders(UserData){
    const client = await getMongoClientInstance()
    const Db = client.db('Pu_Mato')
    const collection = Db.collection('Orders')
    console.log(UserData)
    const AccountType = UserData.AccountType=="Seller" ? "ShopeName" : "UserName"
    console.log({[AccountType]: UserData.UserName})
    const result = await collection.find({[AccountType]: UserData.UserName}).toArray()
    console.log(result)
    await client.close()
    return result

}

//192.168.4.121
module.exports = {
    Fetch_Orders
}