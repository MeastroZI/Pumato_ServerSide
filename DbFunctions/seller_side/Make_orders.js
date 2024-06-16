const {getMongoClientInstance , get_Object_id} = require('../get_Db_Connection')
const fs = require('fs')
const path = require('path')



// {
//     _id: ObjectId('66310e4151233ad7a8c934df'),
//     ItemName: 'Dabali',
//     price: '50',
//     UserName: 'test1',
//     ShopeName: 'shope2',
//     QTY: 20
//   },

async function creat_Order (data){
    const connection = getMongoClientInstance()
    const client = await connection;
    const collection = client.db('Pu_Mato').collection('Orders');
    const result = await collection.insertOne(data);
    client.close()
    return result.Acknowledgement
   
}

module.exports = {creat_Order}