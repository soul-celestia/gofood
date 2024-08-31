const mongoose = require('mongoose')
const URI = 'mongodb://localhost:27017/gofood'

const mongoDb = async() => {
    try {
        await mongoose.connect(URI);
        console.log('Connected Successfully');
        const sampleCollection = mongoose.connection.db.collection('sample');
        const data = await sampleCollection.find({}).toArray();
        const foodCategoryCollection = mongoose.connection.db.collection('foodCategory');
        const catdata = await foodCategoryCollection.find({}).toArray();
        global.food_items = data;
        global.foodCategory = catdata;
    } catch (err) {
        console.error(err);
    }
}
module.exports = mongoDb;