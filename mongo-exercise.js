
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/mongo-exercises')
    .then(() => console.log('Connect to mongodb.'))
    .catch(err => console.log('Something went wrong for connecting db.', err));

const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    date: {type: Date, default: Date.now},
    tags: [String],
    isPublished: Boolean,
    price: Number
});

const Course = mongoose.model('Course', courseSchema);

async function getCourses() {
    const courses = await Course
                            .find({ isPublished: true })
                            .or([
                                    {name: /.*by.*/i}, 
                                    {price: { $gte: 15}}
                                ])
                            .sort({ price: -1})
                            .select({ name:1, author: 1, price: 1});
    console.log(courses);
}

getCourses();
