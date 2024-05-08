import connect from "@/utils/db";
import Post from "@/models/Post";

export const GET = async (request, { params }) => {
    try {
        await connect();

        const posts = await Post.find({
            creator: params.id
        }).populate('creator')
        
        return new Response(JSON.stringify(posts), {
            status: 200
        });
    } catch (error) {
        return new Response('Failed to fetch posts!', {
            status: 500
        });
    }
}