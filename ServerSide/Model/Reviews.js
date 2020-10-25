const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    id : {
        type: Number,
        required : true
    },
    title : {
        type : String,
        required : true
    },
    description : {
        type: String,
        required: true
    },
    rating : {
        type: Number,
        required: true
    },
    poster : {
        type : String,
        required : true
    }
})
module.exports = mongoose.model('Reviews', reviewSchema);