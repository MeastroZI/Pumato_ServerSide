const { MongoClient, ServerApiVersion , ObjectId} = require("mongodb");
const uri = "mongodb+srv://Pu_Mato:PuMato12345678@cluster0.afmzbvm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const connectionPool = []



// async function run() {
//     try {
//         await client.connect();

//         await client.db("admin").command({ ping: 1 });
//         console.log("Pinged your deployment. You successfully connected to MongoDB!");
//     } finally {
//         await client.close();
//     }
// }
// run().catch(console.dir);



async function getMongoClientInstance() {
    if (connectionPool.length > 0) {
        console.log("resusing the cleint")
        await connectionPool[connectionPool.length-1].connect()
        return connectionPool[connectionPool.length-1]
    }
    else {
        console.log("created new client")
        const client = new MongoClient(uri, {
            serverApi: {
                version: ServerApiVersion.v1,
                strict: true,
                deprecationErrors: true,
            }
        }
        )
        
        try {
            await client.connect();
            await client.db("admin").command({ ping: 1 });
            connectionPool.push(client)
            console.log("Pinged your deployment. You successfully connected to MongoDB!");
        }
        catch (err){
            // console.log(err)
            console.err(err)
        }
        return client
    }
}

function get_Object_id(){
    const newObjId = new ObjectId()
    return newObjId
}

module.exports = {
    getMongoClientInstance , get_Object_id
}
