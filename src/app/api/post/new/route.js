import connect from "@/utils/db";
import Post from "@/models/Post";


export const POST = async (req) => {
    const { userId, title, content, tag, time } = await req.json();

    try {
        await connect();
        const newPost = new Post({ creator: userId, content, tag, title, time });

        await newPost.save();

        return new Response(JSON.stringify(newPost), { status: 201 })
    } catch (error) {
        return new Response('Failed to create a new post', { status: 500 })
    }
}