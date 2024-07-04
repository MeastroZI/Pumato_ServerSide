const {getMongoClientInstance , get_Object_id} = require('../get_Db_Connection')
const fs = require('fs')
const path = require('path')


async function enterFoodItem(data) {
    const connection = getMongoClientInstance()
    const client = await connection
   
    const collection = client.db('Pu_Mato').collection('foodData')
    const documentData = data
    documentData._id = get_Object_id()
    const idString = documentData._id.toString()
    const filePath = path.join(__dirname , ".." , ".." , "Imgs" )
    const base64Data = documentData.image.replace(/^data:image\/\w+;base64,/, '');
    console.log(idString)
    const binaryData = Buffer.from(base64Data, 'base64');
    console.log(filePath)
    fs.writeFileSync(path.join(filePath ,idString+".jpeg") , binaryData)
    documentData.image= idString + ".jpeg"
    
    console.log(documentData)
    const result =await collection.insertOne(documentData)
    console.log(result)
    await client.close()
    return result.Acknowledgement
   


    
}

     


module.exports = {enterFoodItem}