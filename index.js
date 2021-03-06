const {
    app,
    mongo
} = require('./src/config/config');
const router = require('./src/router');
const main = async () => {
    /* 连接数据库 */
    await mongo.connect();
    /* 路由设置 */
    router();
    /* 监听 */
    app.listen(8083, () => {
        console.log('Example app listening on port 8083!');
    });
};
main();