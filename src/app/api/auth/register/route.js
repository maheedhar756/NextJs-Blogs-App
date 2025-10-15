import { connectToDatabase } from "@/utils/db";
import { User } from "@/models/user.model";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs"

export async function POST(request){
  try{
    const { name, email, password } = await request.json()

    if (name === undefined || email === undefined || password === undefined){
      return NextResponse.json({ message: "Name, Email and Password are required" }, {status: 400})
    }

    await connectToDatabase();

    const existingUser = await User.findOne({email});

    if(existingUser){
      return NextResponse.json({ message: "User already exists" }, {status: 400})
    }

    const hashedPassword =  await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name, email, password: hashedPassword
    })

    return NextResponse.json({
      message: "User registered successfully",
      user: newUser,
    }, {
      status: 201,
    })
  }
  catch(error){
    return NextResponse.json({ message: "Internal Server Error"}, {status: 500})
  }
}