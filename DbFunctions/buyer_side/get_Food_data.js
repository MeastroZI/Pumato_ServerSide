const { getMongoClientInstance } = require('../get_Db_Connection')

// {
//     _id: ObjectId('662e7edab1d9e0687fc934de'),
//     item_name: 'testFood',
//     description: 'test_description',
//     price: 10,
//     Name: 'Test'
//   },


// { $sample: { size: Num } }, // Assuming `Num` is a variable with the desired sample size
//         {
//             $addFields: {
//                 URL: { $concat: [`${process.env.LOCAL_HOST}/`, "$image"] }
//             }
//         }
async function FechFoodData(Num) {
    const client = await getMongoClientInstance()
    const Db = client.db('Pu_Mato')
    const collection = Db.collection('foodData')
    const result = await collection.aggregate([

        { $sample: { size: Num } },
        {
            $addFields: {
                URL: { $concat: [`${process.env.LOCAL_HOST}/Imgs/`, "$image"] }
            }
        }

    ]).toArray()
    console.log(result)
    await client.close()
    return result

}


module.exports = {
    FechFoodData
}