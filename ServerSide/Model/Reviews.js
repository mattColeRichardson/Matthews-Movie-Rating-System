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
    date : {
        type : Date,
        default : Date.now
    },
    poster : {
        type : string,
        required : true
    }
})
module.exports = mongoose.model('Reviews', reviewSchema);