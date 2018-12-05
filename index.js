const {
    app,
    mongo
} = require('./src/config/config');
const router = require('./src/router');
const main = async () => {
    await mongo.connect();
    router();
    app.listen(8083, () => {
        console.log('Example app listening on port 8083!');
    });
};
main();