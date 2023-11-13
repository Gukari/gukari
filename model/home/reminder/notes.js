const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const noteschema = new Schema({
   title:{
         type:String,
        require:true,
        },
    description:{
        type:String,
        require:true,
    },
    image:{
        type:String,
        require:true,
    },
    imageurl:{
        type:String,
        require:true,
    },
    date:{
        type:Date,
        require:true,
    },
    time:{
        type:String,
        require:true,
    },
    status:{
        type:String,
        require:true,
    },
    reminder:[
        {
            type:Schema.Types.ObjectId,
            ref:"Reminder",
        }
    ],
    user:[
        {
            type:Schema.Types.ObjectId,
            ref:"User",
        }
    ],
    
   
}, { timestamps: true });

module.exports = mongoose.model('Note', noteschema);


