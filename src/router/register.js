const express = require('express');
const shortid = require('shortid');
const {
    mongo
} = require('../config/config');
class Register extends express.Router {
    constructor() {
        super();
        this.get('/', async (req, res) => {
            let {
                userName,
                password
            } = req.query;
            if (!userName || !password) {
                res.send('无效的参数');
                return;
            }
            const result = await mongo.find('users', {
                userName
            });
            if (result.length > 0) {
                res.send(JSON.stringify({
                    code: 1001,
                    message: 'this account is already registered'
                }));
            } else {
                await mongo.insert('users', {
                    userName,
                    password,
                    openId:shortid.generate(),
                });
                res.send('注册成功');
            }
        });
    }
}
module.exports = new Register();