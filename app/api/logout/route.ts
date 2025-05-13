import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request:NextRequest):Promise<NextResponse>{
    try
    {
        const cookiesc=await cookies()
        cookiesc.delete('token')

        return NextResponse.json({message:'logout done'})

    }
    catch(err)
    {
        console.log(err)
        return NextResponse.json({message:'err'})

    }

} 