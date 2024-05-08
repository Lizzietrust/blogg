import connect from "@/utils/db";
import Post from "@/models/Post";


export const GET = async (request) => {
    try {
        await connect();

        const posts = await Post.find({}).populate('creator');

        return new Response(JSON.stringify(posts), {
            status: 200
        });
    } catch (error) {
        console.error(error);
        return new Response('Failed to fetch posts!', {
            status: 500
        });
    }
}