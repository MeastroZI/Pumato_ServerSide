const getToken = () => {

    const min = 1;
    const max = 9;
    let code = 0 ;

    for (let i  = 0 ; i < 6 ; i++){
        const num = Math.floor(Math.random() * (max - min + 1)) + min;
        code = 10*code + num
    }
    return code

}



module.exports = {getToken}