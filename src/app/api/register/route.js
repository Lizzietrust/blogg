import User from "@/models/User";
import connect from "@/utils/db";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";


export const POST = async (request) => {
    const { email, username, password } = await request.json();

    await connect();

    const existingUser = await User.findOne({ username });

    if (existingUser) {
        return new NextResponse("Username is already in use", { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 5);

    const newUser = new User({
        email,
        username,
        password: hashedPassword,
    });

    try {
        await newUser.save();
        return new NextResponse("user is registered", { status: 200 });
    } catch (error) {
        return new NextResponse(error, {
            status: 500,
        });
    }
}