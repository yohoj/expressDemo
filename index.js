const {
    app,
    mongo
} = require('./src/config/config');
const router = require('./src/router');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const main = async () => {
    await mongo.connect();
    app.all('*', function (req, res, next) {
        res.header('Access-Control-Allow-Credentials',true);
        res.header('Access-Control-Allow-Origin', 'http://10.131.4.42:3000');
        res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
        res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');

        if (req.method == 'OPTIONS') {
            res.send(200);
            //让options请求快速返回
        } else {
            next();
        }
    });
    var identityKey = 'skey';

    app.use(session({
        name: identityKey,
        secret: 'chyingp', // 用来对session id相关的cookie进行签名
        store: new FileStore(), // 本地存储session（文本文件，也可以选择其他store，比如redis的）
        saveUninitialized: false, // 是否自动保存未初始化的会话，建议false
        resave: false, // 是否每次都重新保存会话，建议false
        cookie: {
            maxAge: 7*24*60*60 * 1000 // 有效期，单位是毫秒
        }
    }));
    router();
    app.listen(8083, () => {
        console.log('Example app listening on port 8083!');
    });
};
main();