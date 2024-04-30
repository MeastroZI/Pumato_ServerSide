const {getMongoClientInstance} = require('../get_Db_Connection')



async function Get_Shope_Food (ShopeName){
    const client =await getMongoClientInstance()
    const Db = client.db('Pu_Mato')
    const collection = Db.collection('foodData')
    const result = await collection.find({Name:ShopeName}).toArray()
    await client.close()
    return result
}

module.exports = {
    Get_Shope_Food
}