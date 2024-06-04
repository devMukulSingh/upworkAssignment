import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { jwtSign } from "@/lib/jwt";
import { cookies } from "next/headers";

export async function POST(req:NextRequest,res:NextResponse){
    try{
        const {  email,fullName,password } = await req.json();

        if(!email) return NextResponse.json({
            error:"email is required"
        },{status:400})
        if (!password) return NextResponse.json({
            error: "password is required"
        }, { status: 400 })
        if (!fullName) return NextResponse.json({
            error: "fullName is required"
        }, { status: 400 })

        const isUserExists =  await prisma.user.findFirst({
            where:{
                email
            }
        });

        if (isUserExists) return NextResponse.json({
            error:"user already exists"
        },{
            status:400
        });

        const hashedPassword = await bcrypt.hash(password,12);

        const user = await prisma.user.create({
            data:{
                email,
                fullName,
                password:hashedPassword
            }
        });

        const token = await jwtSign();
        if (!token) return NextResponse.json({
            error: 'Token is required'
        }, { status: 500 });

        cookies().set('token',token);
        
        return NextResponse
        .json({...user,token},{status:201})

    }
    catch(e){   
        console.log(`Error in POST user `,e);
        return NextResponse.json(e,{
            status:500
        })
    }
}