import connect from "@/utils/db";
// import Post from "@/models/Post";
import Draft from "@/models/Draft";


export const GET = async (request, { params }) => {
    try {
        await connect();

        const draft = await Draft.findById(params.id).populate('creator');

        if(!draft) return new Response('Post not found!', {
            status: 404
        });

        return new Response(JSON.stringify(draft), {
            status: 200
        });
    } catch (error) {
        console.error(error);
        return new Response('Failed to fetch post!', {
            status: 500
        });
    }
}

export const PATCH = async (request, { params }) => {
    const { title, content, tag, time } = await request.json();

    try {
        await connect();

        const existingDraft = await Draft.findById(params.id);

        if(!existingDraft) return new Response('Post not found!', {
            status: 404
        });

        existingDraft.title = title;
        existingDraft.content = content;
        existingDraft.tag = tag;
        existingDraft.time = time;

        await existingDraft.save();

        return new Response(JSON.stringify(existingDraft), {
            status: 200
        });
    } catch (error) {
        return new Response('Failed to update post!', {
            status: 500
        });
    }
}

export const DELETE = async (request, { params }) => {
    try {
        await connect();

        await Draft.findByIdAndDelete(params.id);
        

        return new Response('Post deleted successfully', {
            status: 200
        });
    } catch (error) {
        return new Response('Failed to delete post!', {
            status: 500
        });
    }
}