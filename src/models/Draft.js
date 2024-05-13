import { Schema, model, models } from "mongoose";


const draftSchema = new Schema({
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

const Draft = models.Draft || model('Draft', draftSchema);

export default Draft;