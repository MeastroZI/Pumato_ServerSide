const {getMongoClientInstance} = require('../get_Db_Connection')


async function Get_Shope_data(){
    const client =await getMongoClientInstance()
    const Db = client.db('Pu_Mato')
    const collection = Db.collection('User_Info')
    const result = await collection.find({"Account_Type" : "Seller"}).toArray()
    await client.close()
    return result
}


module.exports = {
    Get_Shope_data 
}