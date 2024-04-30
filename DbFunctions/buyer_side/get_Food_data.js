const {getMongoClientInstance} = require('../get_Db_Connection')



async function FechFoodData(Num){
    const client =await getMongoClientInstance()
    const Db = client.db('Pu_Mato')
    const collection = Db.collection('foodData')
    const result = await collection.aggregate([
        {$sample: {size:Num}}
    ]).toArray()
    await client.close()
    return result
    
}


module.exports = {
    FechFoodData
}