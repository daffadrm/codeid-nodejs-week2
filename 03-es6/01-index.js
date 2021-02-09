// pastikan selalu import dotenv di line pertama
import dotenv from 'dotenv';
//CORS is used to restrict access between web applications
import cors from "cors";
import express from "express";

import models from './models/index.js';

// load config environment
dotenv.config()
const port = process.env.PORT || 1337
// let's do it
const app = express();
app.get("/", (req, res) => {
    res.send("Cool");
});

app.use((req, res, next) => {
    req.context = {
        models,
        me: models.users[1],
    };
    next();
});

app.listen(port, () =>
    console.log(`Server listening on port ${port}`)
)

/* console.log('Hello Fullstack');

console.log(process.env.PASSWORD); */