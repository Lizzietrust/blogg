import connect from "@/utils/db";
import Draft from "@/models/Draft";

export const GET = async (request, { params }) => {
    try {
        await connect();

        const drafts = await Draft.find({
            creator: params.id
        }).populate('creator')
        
        return new Response(JSON.stringify(drafts), {
            status: 200
        });
    } catch (error) {
        return new Response('Failed to fetch drafts!', {
            status: 500
        });
    }
}