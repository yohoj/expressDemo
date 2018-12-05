const express = require('express');
const {
    mongo
} = require('../config/config');
class Login extends express.Router {
    constructor() {
        super();
        this.get('/', async (req, res) => {
            let {
                userName,
                password
            } = req.query;
            const result = await mongo.find('users', {
                userName,
                password
            });
            if (result.length >= 1) {
                req.session.regenerate(function (err) {
                    if (err) {
                        return res.json({
                            code: 2,
                            data: {},
                        });
                    }

                    req.session.openId = result[0].openId;
                    res.json({
                        code: 0,
                        data: {
                            openId: result[0].openId,
                        }
                    });
                });
            } else {
                res.json({
                    code: 2,
                    data: {}
                });
            }
        });
    }
}
module.exports = new Login();