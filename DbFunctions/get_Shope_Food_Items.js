const Get_Shope_Food = (Id)=>{
    let food_data = [
        { Name: "Dabeli1", discription: "Lorem ipsum dolor, sit amet consectetur  ", price: 1000, Place: "Pit", URL:'http://192.168.1.11:8000/Imgs/Img1.jpeg'  },
    
        { Name: "Dabeli2", discription: "Lorem ipsum dolor, sit amet consectetur  ", price: 10, Place: "Pit", URL :'http://192.168.1.11:8000/Imgs/Img2.jpeg'   },
    
        { Name: "Dabeli3", discription: "Lorem ipsum dolor, sit amet consectetur  ", price: 1000, Place: "Piet", URL: 'http://192.168.1.11:8000/Imgs/Img3.jpeg'   },
    
        { Name: "Dabeli4", discription: "Lorem ipsum dolor, sit amet consectetur  ", price: 100, Place: "Piet", URL: 'http://192.168.1.11:8000/Imgs/Img4.jpeg'   },
    
        { Name: "Dabeli5", discription: "Lorem ipsum dolor, sit amet consectetur  ", price: 100000, Place: "Piet", URL: 'http://192.168.1.11:8000/Imgs/Img5.jpeg'   },
    ]
    return food_data ;
}
module.exports = {
    Get_Shope_Food
}