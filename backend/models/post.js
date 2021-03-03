const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const postSchema = new Schema({
    num: { type: Number },
    title: { type: String },
    content: { type: String },
    writer: { type: String },
    password: { type: String, minlength: 6 },
    date: { type: String },
    viewNum: { type: Number }
});

module.exports = mongoose.model('Post', postSchema);