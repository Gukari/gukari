const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');
const { boolean } = require('webidl-conversions');
const autopopulate = require('mongoose-autopopulate');

const Folderschema = new Schema({
    quizCard:[
        {
            cardId: {
                type: Schema.Types.ObjectId,
                ref: "Quizcard",
            },
            position: {
                type: Number,
            }
        }
    ],
    ImageUpload:[
        {
            type:Schema.Types.ObjectId,
            ref:"ImageUpload",
        }
    ],
    hearts:[
        {
            type:Schema.Types.ObjectId,
            ref:"User"

        }
    ],
    VideoUpload:[
        {
            type:Schema.Types.ObjectId,
            ref:"VideoUpload",
        }
    ],
    user:{
        type:Schema.Types.ObjectId,
        ref:"User",
    },
    name:{
        type:String,
    },
    description:{
        type:String,
    },
    color:{
        type:String,
    },
    visibility:{
        type:String,
    },
    image:{
        type:String,
    },
    user:[
        {
            type:Schema.Types.ObjectId,
            ref:"User",
        }
    
    ]



}, { timestamps: true }).plugin(autopopulate);
module.exports = mongoose.model('Folder', Folderschema);