import { Schema, model, models } from "mongoose";


const postSchema = new Schema({
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },

    content: {
        type: String,
        required: [true, 'Content is required']
    },

    tag: {
        type: String,
        required: [true, 'Tag is required']
    },

    title: {
        type: String,
        required: [true, 'Title is required']
    },

    time: {
        type: String,
        required: [true, 'Read Time is required']
    },

    imageUrl: {
        type: String,
    }
},  { timestamps: true });

const Post = models.Post || model('Post', postSchema);

export default Post;