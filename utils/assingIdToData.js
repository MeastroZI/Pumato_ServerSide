

let IDReached  = 0 ; 
const AssignIdToData =(Food_Data )=>{
    Food_Data.forEach((itm)=>{
        itm.id = IDReached ;
        IDReached = IDReached+1 ;
    })
}

module.exports = {
    AssignIdToData
}