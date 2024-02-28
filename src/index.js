require('dotenv').config()

const express = require('express');

const initApiRoute = require('./routes/api');
const configViewEngine = require('./config/viewEngine');
const { checkDatabaseExists } = require('./config/connectDB');
const path = require('path');


const app = express();
const port = process.env.PORT;


app.use(function (req, res, next) {

    res.setHeader('Access-Control-Allow-Origin', '*');

    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    res.setHeader('Access-Control-Allow-Credentials', true);

    next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/sql", express.static(path.join(__dirname, "sql")));



configViewEngine(app);

initApiRoute(app);

checkDatabaseExists();

app.use((req, res) => {
    res.status(404).json({ error: 'Không có API này' });
});

const server = app.listen(port, () => {
    console.log(`nodejs JS ${port}`)
})