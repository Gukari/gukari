const mongoose = require('mongoose');
const { Schema } = mongoose;
const todoschema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  ischecked: {
    type: Boolean,
    default: false,
  },
  isimportant: {
    type: Boolean,
    default: false,
  },
  
  
});
const eventSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  tags: {
    type: String,
    required: false
    },
    location:{
      type:String,
      default:""
    },
    
    position:{
      type:Number
    },

  description: {
    type: String,
    required: false
  },
  startDate: {
    type: Date,
    required: false
  },
  reminder:{
    type:String,
  },
  endDate: {
    type: Date,
    required: false
  },
  enddate:{
    type: Date,
    required: false
  },

  priority: {
    type: String,
    enum: ['Primary', 'Secondary', 'Listed'],
    default: 'Primary'
  },
  time: {
    type: String,
  },
  image: {
    type: String
  },
  iscompleted: {
    type: Boolean,
  },
  date: {
    type: String
  },
  imageurl: {
    type: String
    },
  todolist:[{todoschema}],

},{timestamps:true});


const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
