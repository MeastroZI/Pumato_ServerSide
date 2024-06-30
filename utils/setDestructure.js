function setdestrcuture (key , map){
    setTimeout(()=>{
        map.destroy(key)
    }, 60000)
}