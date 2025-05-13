import { NextResponse  } from "next/server";
import { NextRequest  } from "next/server";
import user from "../model/User";
import bcrypt from "bcryptjs";
import {connectDB} from "../../connect/db";
import mongoose from "mongoose";
export async function POST(req:NextRequest):Promise<NextResponse>{
    try
    {
        await connectDB()
    const body=await req.json()
    const{email,password}=body
    if(!email || !password)
    {
        return NextResponse.json({
            message:"Please fill all the fields",
        })
    }
    const existing=await user.findOne({
        email
    })
    if(existing)
    {
        return NextResponse.json({
            message:"User already exists",
        })
    }
    const hashpass = await bcrypt.hash(password, 10);

    const newuser=await user.create({
        email,
        password:hashpass
    })
    newuser.save()
    return NextResponse.json({
        message:"User created successfully",
    })
}
catch(err)
{
    console.log(err)
    return NextResponse.json({
        message:"Error in signup",
    })

}
}
