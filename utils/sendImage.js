const axios = require('axios');
const fs = require('fs');
const path = require('path');

async function sendImage() {
    try {
        // Read the image file synchronously
        const image = fs.readFileSync(path.join(__dirname, './Img6.jpeg'));

        // Convert the image data to base64
        const imagedata = image.toString('base64');

        // Prepare the payload with the base64 image data
        const payload = {

            userData: {
                UserName: 'test',
                Password: 'Password',
                Account_Type: 'Buyer',
            },
            reqData : {
                image: imagedata,
                name : "rice_ka",
                price : 2000 

            }

        };

        // Send the POST request with the image data
        const result = await axios.post('http://192.168.1.17:8000/Set_Food_Items', payload);

        // Log the response data
        console.log(result.data);
    } catch (err) {
        // Log the error
        console.error('Error sending image:', err.response ? err.response.data : err.message);
    }
}

// Execute the function
sendImage();
