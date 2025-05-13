import { connect } from "http2";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "../../connect/db";
import user from "../model/User";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";

const secret="test"
export async function POST(request:NextRequest):Promise<NextResponse>{
    try{
        await connectDB()
        const cookieStore = await cookies()
        const body=await request.json()
        const {email,password}=body
        if(!email || !password)
        {
            return NextResponse.json({
                message:"Please fill all the fields",
            })
        }
        const existing= await user.findOne({
            email 
        })
        if(!existing)
        {
            return NextResponse.json({
                message:"User does not exist",
            })
        }
        const pass = await bcrypt.compare(password, existing.password);
        if (!pass) {
            return NextResponse.json({ message: "Invalid credentials" });
        }
        
        const jwttoken= jwt.sign({
            id:existing._id,
            email:existing.email
        },
        secret,
        {
            expiresIn:'1Day'
        }
    )  
    cookieStore.set('token', jwttoken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 7, // 7 days
  })

  


        return NextResponse.json({
            message:"Login successful",
        jwttoken
        })
        
}
catch(err)
{
    console.log(err)
    return NextResponse.json({
        message:"Error in login",
    })
}
}