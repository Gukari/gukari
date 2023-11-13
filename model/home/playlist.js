const mongoose = require('mongoose');
const Schema = mongoose.Schema
const Playlistshema = new Schema({
    title: {
        type: String,
        required: true,
        min: [3, 'Too short'],
        max: [50, 'Too long']
    },
    description: {
        type: String,
        required: false,
        max: [500, 'Too long'],
    },
    quiz:{
        type:Schema.Types.ObjectId,
        ref:"Quizcard",
    },
    upload:{
        type:Schema.Types.ObjectId,
        ref:"UploadSchema",
    }

    
},{timestamps:true})
module.exports = mongoose.model('Playlist',Playlistshema)