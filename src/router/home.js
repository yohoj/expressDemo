const express = require('express');
class Home extends express.Router {
    constructor() {
        super();
        this.use((req, res, next) => {
            let time = new Date().toLocaleString();
            console.log(`${time}:${req.originalUrl}`);
            next();
        });
        this.get('/', (req, res) => {
            res.send('home page');
        });
    }
}
module.exports = new Home();