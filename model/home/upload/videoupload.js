const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const autopopulate = require('mongoose-autopopulate');

const commentreplySchema = new Schema({
  user: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User',
      autopopulate: true,
    }
  ],
  targetuser: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User',
      autopopulate: true,
    }
  ],
  content: {
    type: String,
  },
  likes: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User',
    }
  ],
  dislikes: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User',
    }
  ],
}, { timestamps: true }).plugin(autopopulate);

const commentSchema = new Schema({
  user: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User',
    }
  ],
  content: {
    type: String,
  },
  likes: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User',
    }
  ],
  dislikes: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User',
    }
  ],
  replies: [commentreplySchema],
}, { timestamps: true }).plugin(autopopulate);

const likeschema = new Schema({
  user: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User',
    }
  ],
}).plugin(autopopulate);

const dislikeschema = new Schema({ 
  user: {
    type: String,
  },
}).plugin(autopopulate);

const VideoUploadSchema = new Schema({
  title: {
    type: String,
    required: true,

    
  },
  tags: {
    type: [String],
  },
  thumbnail: {
    type: String
  },
  visibility: {
    type: String,
    default: 'public'
  },
   viewcount: {
    type: Number,
    default: 0,
    
  },
  videocreated:{
    type:Date,
  },
  description: {
    type: String,
  },
  VideoUrl: {
    type: String,
    required: true,
  },
  quizCard:[
    {
        type:Schema.Types.ObjectId,
        ref:"Quizcard",
    }
],
duration:{
  type: Number,
},
  category: {
    type: String,
    enum: ['general', 'technology', 'education', 'health', 'sports', 'trending', 'music', 'food', 'news', 'art'],
  },
  author: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User',
    }
  ],
  likes: [likeschema],
  dislikes: [dislikeschema],
  comments: [commentSchema],
}, { timestamps: true }).plugin(autopopulate);

module.exports = mongoose.model('VideoUpload', VideoUploadSchema);
