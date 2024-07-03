const express = require('express');
const morgan = require('morgan');

const app = express();
app.use(morgan('dev'));
app.use(express.json())

const dataStore = [];

app.get('/', (req, res) => {
    res.send('hello')
})

app.post('/dataStore', (req,res) => {
    const newData = {
        id: dataStore.length + 1,
        data: req.body.data
    };
    dataStore.push(newData);
    res.json(newData)
});

app.get('/dataStore', (req,res) => {
    res.json(dataStore)
});

app.get('/dataStore/:id', (req,res) => {
    const dataID = dataStore.find(i => i.id === parseInt(req.params.id));
    if (!dataID) {
        return res.status(404).send('Id not found')
    }
    res.json(dataID)
});

app.put('/dataStore/:id', (req,res) => {
    const dataID = dataStore.find(i => i.id === parseInt(req.params.id));
    if (!dataID) {
        return res.status(404).send('Id not found')
    }
    dataID.data = req.body.data;
    res.json(dataID)
});

app.delete('/dataStore/:id', (req,res) => {
    const index = dataStore.findIndex(i => i.id === parseInt(req.params.id));
    if (index === -1) {
        return res.status(404).send('Id not found')
    }
    dataStore.splice(index, 1);
    res.status(204).send();
});

const PORT= 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})

