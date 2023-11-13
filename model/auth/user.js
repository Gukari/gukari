const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');
const { boolean } = require('webidl-conversions');
const autopopulate = require('mongoose-autopopulate');

const UserSchema = new Schema({
    username:{
        type:String,
        require:true,
    },
    googleId:{
        type:String
    },
    email:{
        type:String,
        require:true,
        unique: true
    },
    bannerImage:{
        type:String,
    },
    banner:{
        type:String,

    },
   profilecolor:{
        type:String,
    },
    handle:{
        type:String
    },
    description:{
        type:String
    },
    links:{
        type:String
    },
    photourl: {
        type: String,
    },
    surname:{
        type:String,
    },
    category:{
        type:String,
    },

    password:{
        type:String,
    },
    Account:[
        {
            type:Schema.Types.ObjectId,
            ref: "Account",
        }
    ],
    Istudent:{
        type:Boolean,
        default: false,
    },
    quizCard:[
        {
            type:Schema.Types.ObjectId,
            ref:"Quizcard",
        }
    ],
    recentCard:[
        {
            type:Schema.Types.ObjectId,
            ref:"Quizcard",
        },
    ],
    uploadBoard:[
        {
            type:Schema.Types.ObjectId,
            ref:"UploadSchema",
        }
    ],
    saves:[
        {
            type:Schema.Types.ObjectId,
            ref:"Quizcard",

        }, {
            type:Schema.Types.ObjectId,
            ref:"UploadSchema",

        },{
            type:Schema.Types.ObjectId,
            ref:"KanbanBoard",
        },{
            type:Schema.Types.ObjectId,
            ref:"Reminder",
            
        },{
            type:Schema.Types.ObjectId,
            ref:"Workspace",
        }
       
    ],
    Workspace:[
        {
            type:Schema.Types.ObjectId,
            ref:"Workspace",
        }
    ],
    reminder:[
        {
            type:Schema.Types.ObjectId,
            ref:"Reminder",
        }
    ],
    Task:[
        {
            type:Schema.Types.ObjectId,
            ref:"Task",
        }
    ],
    Uploads:[
        {
            type:Schema.Types.ObjectId,
            ref:"UploadSchema",
        }
    ],
    VideoUpload:[
        {
            type:Schema.Types.ObjectId,
            ref:"VideoUploadSchema",
        }
    ],
    followers:[
        {
            type:Schema.Types.ObjectId,
            ref:"User",
        }
    ],
    following:[
        {
            type:Schema.Types.ObjectId,
            ref:"User",
        }
    ],
    inbox:{
        type:String,
    },
    districUrl:{
        type:String,
        
    },
    dislikedVideos: [
        {
            type: Schema.Types.ObjectId,
            ref: "VideoUploadSchema",
        }
    ],
    likedVideos:[
        {
            type:Schema.Types.ObjectId,
            ref:"VideoUploadSchema",
        }
    ],
    folder:[
        {
            type:Schema.Types.ObjectId,
            ref:"Folder",
        }
    ],
    
   
  playlist: [
    {
        type: Schema.Types.ObjectId,
        ref: "VideoUploadSchema",
    }

],

    
    
},{timestamps:true})

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', UserSchema)