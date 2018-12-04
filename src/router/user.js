const express = require('express');
const {
    mongo
} = require('../config/config');
class User extends express.Router {
    constructor() {
        super();
        this.get('/info', async (req, res) => {
            var sess = req.session;
            var loginUser = sess.userName;
            var isLogin = !!loginUser;
            if(isLogin){
                let userInfo = await mongo.find('users', {userName:loginUser});
                res.json({code:0,data:{userInfo}});
            }
            else{
                res.json({code:1002,data:{}});
            }
        });
    }
}
module.exports = new User();