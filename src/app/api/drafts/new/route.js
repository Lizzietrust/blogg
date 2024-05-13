import connect from "@/utils/db";
// import Post from "@/models/Post";
import Draft from "@/models/Draft";


export const POST = async (req) => {
    
    const { userId, title, content, tag, time, imageUrl  } = await req.json();

    try {
        await connect();
        
        const newDraft = new Draft({ creator: userId, content, tag, title, time, imageUrl });

        
        await newDraft.save();
        

        return new Response(JSON.stringify(newDraft), { status: 201 })
        
    } catch (error) {
        console.error(error);
        return new Response('Failed to create a new draft', { status: 500 })
    }
}

