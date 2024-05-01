import NextAuth from "next-auth"
import FacebookProvider from "next-auth/providers/facebook";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import User from "@/models/User";
import connect from "@/utils/db";


export const authOptions = {
  
  providers: [
    CredentialsProvider({
        id: "credentials",
        name: "Credentials",
        credentials: {
        //   email: { label: "Email", type: "text" },
          username: { label: "Username", type: "text" },
          password: { label: "Password", type: "password" },
        },
        async authorize(credentials, req) {
          await connect();
          try {
            const user = await User.findOne({ username: credentials.username });
            // session.user.id = user._id.toString();

            if (user) {
              const isPasswordCorrect = await bcrypt.compare(
                credentials.password,
                user.password
              );
              if (isPasswordCorrect) {
                return user;
              }
            }
          } catch (error) {
            throw new Error(error);
          }
        },
    }),
    FacebookProvider({
        clientId: process.env.FACEBOOK_CLIENT_ID ?? "",
        clientSecret: process.env.FACEBOOK_CLIENT_SECRET ?? "",
    })
    // ...add more providers here
  ],
  session: {
    // Enable JWT session
    jwt: true,
    // Set maxAge for persistent sessions (30 days)
    maxAge: 30 * 24 * 60 * 60,
  },
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider == "credentials") {
        return true;
      }
      // if (account?.provider == "facebook") {
      //   await connect();
      //   try {
      //     const existingUser = await User.findOne({ email: user.email });
      //     if (!existingUser) {
      //       const newUser = new User({
      //         email: user.email,
      //       });

      //       await newUser.save();
      //       return true;
      //     }
      //     return true;
      //   } catch (err) {
      //     console.log("Error saving user", err);
      //     return false;
      //   }
      // }
    },
  },

}

export const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };