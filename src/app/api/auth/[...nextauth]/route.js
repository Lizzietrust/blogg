import NextAuth from "next-auth"
import FacebookProvider from "next-auth/providers/facebook";
import GoogleProvider from 'next-auth/providers/google';
import AppleProvider from 'next-auth/providers/apple'
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
          name: { label: "name", type: "text" },
          password: { label: "password", type: "password" },
        },
        async authorize(credentials, req) {
          await connect();
          try {
            const user = await User.findOne({ name: credentials.name });
            // const id = user._id.toString();
            // const name = user.name;
            // console.log(id, name);

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
    }), 
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    AppleProvider({
      clientId: process.env.APPLE_ID,
      clientSecret: process.env.APPLE_SECRET,
    }),
    // ...add more providers here
  ],
  // cookies: {
  //   pkceCodeVerifier: {
  //     name: "next-auth.pkce.code_verifier",
  //     options: {
  //       httpOnly: true,
  //       sameSite: "none",
  //       path: "/",
  //       secure: true,
  //     },
  //   },
  // },

  callbacks: {
    async jwt ({ token, user, session }) { 
      if (user?._id) token._id = user._id;

      console.log('jwt>>', {token: token}, {user: user}, {session: session});
      return token
    },
    async session({ session, token, user }) {
      if (token?._id) {
        session.user.id = token._id.toString();
      }
      
      console.log('session>>', {token: token}, {user: user}, {session: session});
      return session;
        
    },
    async signIn({ user, account, profile }) {
      if (account?.provider == "credentials") {
        return true;
      }
      if (account?.provider == "google") {
        await connect();
        try {
          const existingUser = await User.findOne({ name: user.name });
          if (!existingUser) {
            const newUser = new User({
              email: user.email,
              name: user.name
            });

            await newUser.save();
            return true;
          }
          return true;
        } catch (err) {
          console.log("Error saving user", err);
          return false;
        }
      }

      if (account?.provider == "facebook") {
        await connect();
        try {
          const existingUser = await User.findOne({ name: user.name });
          if (!existingUser) {
            const newUser = new User({
              email: user.email,
              // name: user.name
            });

            await newUser.save();
            return true;
          }
          return true;
        } catch (err) {
          console.log("Error saving user", err);
          return false;
        }
      }
      
    },


  },

}


export const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };

