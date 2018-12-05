const express = require('express');
const {
    mongo
} = require('../config/config');
class User extends express.Router {
    constructor() {
        super();
        this.get('/info', async (req, res) => {
            let sess = req.session;
            let isLogin = !!sess.openId;
            if(isLogin){
                let {
                    openId,
                } = req.query;
                openId = openId || sess.openId;
                let userInfo = await mongo.find('users', {openId:openId});
                res.json({code:0,data:{userInfo}});
            }
            else{
                res.json({code:1002,data:{}});
            }
        });
    }
}
module.exports = new User();