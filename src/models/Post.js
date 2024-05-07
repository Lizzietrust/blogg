import { Schema, model, models } from "mongoose";


const postSchema = new Schema({
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },

    content: {
        type: String,
        required: [true, 'Post is required']
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
    }
});

const Post = models.Post || model('Post', postSchema);

export default Post;