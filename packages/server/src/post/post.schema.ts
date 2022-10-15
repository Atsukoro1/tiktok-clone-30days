import * as mongoose from 'mongoose';
 
export const PostSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },

    song: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Song',
        required: false,
    },

    videoUrl: {
        type: String,
        required: true,
    },

    caption: {
        type: String,
        required: true,
        min: 2,
        max: 256
    },

    tags: {
        type: Array<String>,
        default: [],
        required: true
    },

    description: {
        type: String,
        required: false,
        min: 2,
        max: 512
    },
});