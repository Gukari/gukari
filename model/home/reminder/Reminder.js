const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reminderSchema = new Schema({

    Event:[
        {
            type:Schema.Types.ObjectId,
            ref:"Event",
        }
    ],
    user:[
        {
            type:Schema.Types.ObjectId,
            ref:"User",
        }
    ],
    Note:[
        {
            type:Schema.Types.ObjectId,
            ref:"Note",
        }
    ]
}, { timestamps: true });

module.exports = mongoose.model('Reminder', reminderSchema);


