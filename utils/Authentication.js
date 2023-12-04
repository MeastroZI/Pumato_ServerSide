const { Is_User_In_Db } = require("../DbFunctions/Chek_User_In_Db")
const Autherize = (data) => {
   if (Is_User_In_Db(data)) {
       return true;

   }
}


module.exports = {
    Autherize               
}