const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const workspcarchema = new Schema({
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
    rowindex:{
        type:Number,
        require:true,
    },
    type:{
        type:String,
        require:true,
    },
    owner:[
        {
            type:Schema.Types.ObjectId,
            ref:"User",
        }
    ],
    invieteduser:[
        {
            type:Schema.Types.ObjectId,
            ref:"User",
        }
    ],
    kanbanboard:[
        {
            type:Schema.Types.ObjectId,
            ref:"KanbanBoard",
        }
    ],
    notes:[
        {
            type:Schema.Types.ObjectId,
            ref:"Note",
        }
    ],

}, { timestamps: true });
module.exports = mongoose.model('Workspace', workspcarchema);
