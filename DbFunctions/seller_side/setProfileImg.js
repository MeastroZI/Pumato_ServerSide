const path = require('path');
const {getMongoClientInstance , get_Object_id } = require('./get_Db_Connection')
const fs = require('fs')
async function  setImage(data){
    const client = await getMongoClientInstance() ;
    const collection = client.db('Pu_Mato').collection('User_Info')
    const filter = {Email : data.UserData.email , Password : data.UserData.password} ;
    const res = collection.find(filter);
    if(res.accountType != "Business"){
        return false ;
    }
    
    
    const base64 = data.image.replace(/^data:image\/\w+;base64,/ , '');
    const filePath = path.join(__dirname , ".." , ".." , "Imgs" );
    const imgId = get_Object_id();
    fs.readFileSync(path.join(filePath , imgId , ".jpeg") , base64);
    const update = {
        $set : 
        { image : imgId + ".jpeg"}
    }
    const result = collection.updateOne(filter , update ) ;

    return result.Acknowledgement

}

module.exports={
    setImage
}