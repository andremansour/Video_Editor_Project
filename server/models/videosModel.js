const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    name:{
        type: String,
        required: [true, "Please name your video"],
        trim:true
    },
    video:{
        type: Object,
        default: {}
    },
}, {timestamps: true});


const Video = mongoose.model("Video", videoSchema);

module.exports = Video;
