const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const autopopulate = require('mongoose-autopopulate');


const cardSchema = new Schema({
  title: {
    type: String,
    required: true,
    min: [3, 'Too short'],
    max: [50, 'Too long']
  },

  imageUrl:{
    type: String,
    required: false,
  },

  video:[
    {
        type:Schema.Types.ObjectId,
        ref:"VideoUploadSchema",
    }
],
  description: {
    type: String,
    required: false,
    max: [500, 'Too long'],        
  },
  plays: {
    type: Number,
    default: 0
  },
  saves: [{
    type: Schema.Types.ObjectId,
    ref: "User",
    default: []
  }],  
  visability:{
    type: String,
    default:'public'

  },
  videolink:{
    type:String
  },
  foldersave:{
    type:Number
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  user: {
    type: String,
  },
  viewcount:{
    type:Number,
        default: 0

  },
  clones:[
    {
      type:Schema.Types.ObjectId,
      ref: "Quizcard"
    }
  ],
  cloned:[
    {
      type:Schema.Types.ObjectId,
      ref: "User"
    }
  ],
  category: {
    type: String,
    enum: ['general', 'technology', 'education', 'health', 'sports', 'food', 'business', 'art'],
  },
  tags: [
    {
      name: {
        type: String,
      },
      color: {
        type: String,
      }
    }
  ],
  orginatedfrom:[
    {
      type:Schema.Types.ObjectId,
      ref: "User"

    }
  ],

  // color: {
  //   type: String,
  //   default: 'white',
  //   required: false,
    
  // },
  
  cards: {
    required: false,
    type: [{
      term: String,
      position: Number,
      image: String,
      imageUrl: String,
      definition: String,
    }],
    default: []
  },
  views:[{
    type:Schema.Types.ObjectId,
    ref: "User",
    type:Date

  },
 
]
}, { timestamps: true });

module.exports = mongoose.model('Quizcard', cardSchema);
