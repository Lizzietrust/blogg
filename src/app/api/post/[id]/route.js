import connect from "@/utils/db";
import Post from "@/models/Post";


export const GET = async (request, { params }) => {
    try {
        await connect();

        const post = await Post.findById(params.id).populate('creator');

        if(!post) return new Response('Post not found!', {
            status: 404
        });

        return new Response(JSON.stringify(post), {
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

        const existingPost = await Post.findById(params.id);

        if(!existingPost) return new Response('Post not found!', {
            status: 404
        });

        existingPost.title = title;
        existingPost.content = content;
        existingPost.tag = tag;
        existingPost.time = time;

        await existingPost.save();

        return new Response(JSON.stringify(existingPost), {
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

        await Post.findByIdAndDelete(params.id);
        

        return new Response('Post deleted successfully', {
            status: 200
        });
    } catch (error) {
        return new Response('Failed to delete post!', {
            status: 500
        });
    }
}