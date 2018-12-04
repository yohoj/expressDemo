const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017/expressDemo';
class Mongo {
    constructor() {}

    async connect() {
        this.db = await new MongoClient(url).connect();
        this.db = this.db.db();
        console.log(`${url} 连接成功`);
    }
    async insert(collection, data) {
        if (Array.isArray(data)) {
            await this.db.collection(collection).insertMany(data);
        } else {
            await this.db.collection(collection).insertOne(data);
        }
    }
    async find(collection, whereStr) {
        const result = await this.db.collection(collection).find(whereStr).toArray();
        return result;
    }
    async delete(collection, data) {
        if (Array.isArray(data)) {
            await this.db.collection(collection).deleteMany(data);
        } else {
            await this.db.collection(collection).deleteOne(data);
        }
    }
    async updateOne(collection, whereStr, updateStr) {
        updateStr = {
            $set: updateStr
        };
        await this.db.collection(collection).updateOne(whereStr, updateStr);
    }
    async updateMany(collection, whereStr, updateStr) {
        updateStr = {
            $set: updateStr
        };
        const {
            res
        } = await this.db.collection(collection).updateMany(whereStr, updateStr);
        return res.result.nModified;
    }
}
module.exports = Mongo;