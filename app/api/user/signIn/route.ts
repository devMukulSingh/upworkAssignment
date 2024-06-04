import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { jwtSign } from "@/lib/jwt";
import { cookies } from "next/headers";

export async function GET(req: NextRequest, res: NextResponse) {
    try {
        const email = req.nextUrl.searchParams.get('email');
        const password = req.nextUrl.searchParams.get('password');

        if (!email) return NextResponse.json({
            error: "email is required"
        }, { status: 400 })
        if (!password) return NextResponse.json({
            error: "password is required"
        }, { status: 400 })

        const user = await prisma.user.findFirst({
            where: {
                email
            }
        });

        if (!user) return NextResponse.json({
            error: "Invalid credentials"
        }, {
            status: 400
        });

        const isPasswordCorrect = await bcrypt.compare(password,user.password);
        
        if (!isPasswordCorrect) return NextResponse.json({
            error:"Invalid credentials"
        },{
            status:400
        });

        const token = await jwtSign();

        if(!token) return NextResponse.json({
            error:'Token is required'
        },{status:500});

        cookies().set('token', token);

        return NextResponse
            .json({ fullName:user.fullName,email:user.email, id:user.id,token }, { status: 200 })
    }
    catch (e) {
        console.log(`Error in GET user`, e);
        return NextResponse.json(e, {
            status: 500
        })
    }
}