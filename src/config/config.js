const express = require('express');
const Mongo = require('../mongodb');
const app = new express();
const mongo = new Mongo();
module.exports = {
    app,
    mongo
};