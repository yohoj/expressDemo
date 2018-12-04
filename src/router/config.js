const express = require('express');
class Config extends express.Router {
    constructor() {
        super();
        this.get('/', (req, res) => {
            res.json({
                code: 0,
                data: {
                    shareTitle: 'test'
                }
            });
        });
    }
}
module.exports = new Config();