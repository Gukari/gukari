const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  image:{
    type:String,
    default:""
    
  },
  dueDate: {
    type: Date,
  },
  row:{
    type:Number,
    default:0
  },
  position: {
    type: Number,
    default: 0,
   
  },
  Comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Comment',
    },
  ],
  description: {
    type: String,
    required: true,
  },
});


const rowSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  position: {
    type: Number,
    default: 0,
   
  },  
  cards: [cardSchema],
});

const kanbanBoardSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  position: {
    type: Number,
    default: 0,
   
  },
  color: {
    type: String,
    default: '#fff',
  },

  rows: [rowSchema],
  visability:{
    type: Boolean,
    default: true,
  },
  bgimage:{
    type:String,
},

  imageurl:{
    type:String,
},
  
  type:{
    type:String,
},
workspace: [
{
  type: mongoose.Schema.Types.ObjectId,
  ref: 'Workspace',

},
],
  viewcount:{
    type:Number
  },
});

module.exports = mongoose.model('Board', kanbanBoardSchema);