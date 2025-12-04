import { MongoClient } from "mongodb";

const url = 'mongodb://localhost:27017';

const client = new MongoClient(url);

const dbName = 'iot-esp32';
const collectionName = 'temperatura';


async function main() {
    // Use connect method to connect to the server
    await client.connect();
    console.log('Connected successfully to server');
    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    // await collection.insertOne({
    //     data: new Date(),
    //     temperatura: 34.45,
    //     umidade: 50.0,
    // });

    await collection.find().forEach(console.log);

    // the following code examples can be pasted here...

    return 'done.';
}

main()
    .then(console.log)
    .catch(console.error)
    .finally(() => client.close());