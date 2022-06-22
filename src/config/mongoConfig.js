import { MongoClient } from "mongodb"
// Replace the uri string with your MongoDB deployment's connection string.
const uri = "mongodb://root:MongoPass!@localhost:27017?retryWrites=true&writeConcern=majority"

const client = new MongoClient(uri)

try {
    await client.connect();
    const database = client.db('tp-final');
    const movies = database.collection('groups');
    // Query for a movie that has the title 'Back to the Future'
    const query = { title: 'Back to the Future' };
    const movie = await movies.findOne(query);
    console.log(movie);
} finally {
    // Ensures that the client will close when you finish/error
    await client.close();
}