import Credentials from "next-auth/providers/credentials";
import { connectToDatabase } from "@/utils/db";
import { User } from "@/models/user.model";
import NextAuth from "next-auth";
import bcrypt from "bcryptjs"
import dotenv from "dotenv";

dotenv.config();

const authOptions = {
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password"},
      },

      async authorize(credentials){
        if(!credentials.email || !credentials.password){
          throw new Error("Email and Password are required")
        }

        await connectToDatabase();
        
        const user = await User.findOne({ email: credentials.email });

        const isPasswordValid = await bcrypt.compare(credentials.password, user.password)
        
        if(!user || !isPasswordValid){
          throw new Error("Invalid email or password")
        }
        return {id: user._id, name: user.name, email: user.email };
      },
    }),
  ],

  session: {
    stratergy: "jwt",
  },

  pages: {
    signIn: "/login"
  },

  callbacks: {
    async jwt({ token, user }){
      if(user){
        token.id = user.id;
      }
      return token
    },

    async session({ session, token }){
      if(token){
        session.user.id = token.id
      }
      return session
    }
  },
  secret: process.env.NEXTAUTH_SECRET
};

const handler = NextAuth(authOptions)

export {handler as GET, handler as POST}