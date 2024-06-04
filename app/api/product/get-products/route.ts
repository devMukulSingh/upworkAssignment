import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";


export async function GET(req:NextRequest,res:NextResponse){
    try{
        const userId = req.nextUrl.searchParams.get('userId');
        
        if(!userId) return NextResponse.json({
            error:"Unauthenticated"
        },{
        status:403
    });

    const products = await prisma.product.findMany({
        where:{
            userId:{
                has:userId
            }
        }
    });
    
    return NextResponse.json(products,{
        status:200
    });

    }
    catch(e){
        console.log(`Error in get-products GET req`, e);
        return NextResponse.json({
            error:`Error in get-products GET req`,e
        },{
            status:500
        });

    }
    
}