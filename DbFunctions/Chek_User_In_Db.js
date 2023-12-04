function Is_User_In_Db(data){

    if (data.UserName == "test" && data.Password == "test") {
        return true ;
    }
}

module.exports = {
    Is_User_In_Db
}