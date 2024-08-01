require('dotenv').config();

const express = require('express');
const app = express();

const { MongoClient } = require('mongodb');
const client = new MongoClient('mongodb://localhost:27017');

const DEFAULT_PORT_NUMBER = 3000;
const PORT = process.env.PORT || DEFAULT_PORT_NUMBER;

app.use(express.json());

app.get('/search', async (req, res) => {
    try {
        await client.connect();
        const db = client.db('engine');
        const collection = db.collection('pages');
      
        const term = req.query.q
   
        const matchedPpages = await collection.find({terms: term}).toArray()
        return res.send(matchedPpages);
    } finally {
        await client.close();
    }
});
app.post('/crawl', async (req, res) => {
    try {
        await client.connect();
        const db = client.db('engine');
        const collection = db.collection('pages');
        
        const { title, content } = req.body;
        if (!title || !content) {
            return res.status(401).send('fields required');
        }
        
        const result = await collection.insertOne({title, terms: content.split(' ')});

        return res.send(result);
    } finally {
        await client.close();
    }


});

app.listen(PORT, () => {
    `Server is running on http://localhost:${PORT}`;
});