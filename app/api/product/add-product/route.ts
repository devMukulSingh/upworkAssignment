import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest,res:NextResponse){

    try{
        const { productName,productDescription,productImage,id } = await req.json();

        if(!productName) return NextResponse.json({
            error:"productName is required"
        },{
            status:400
        })
        if (!productDescription) return NextResponse.json({
            error: "productDescription is required"
        }, {
            status: 400
        })
        if (!productImage) return NextResponse.json({
            error: "productImage is required"
        }, {
            status: 400
        });

        if(!id) return NextResponse.json({
            error:"Unauthorized"
        },{
            status:403
        })

        const isUserExists = prisma.user.findFirst({
            where:{
                id
            }
        })

        if (!isUserExists) return NextResponse.json({
            error:"Unauthorized"
        },{
            status:401
        });

        const product = await prisma.product.create({
            data:{
                description:productDescription,
                name:productName,
                image:productImage,
                userId:[id]
            },
            
            
        });

        return NextResponse.json({
            product
        },{
            status:201
        })
    }
    catch(e){
        console.log(`Error in add - product POST req`,e);
        return NextResponse.json({
            error:`Error in add-product POST req`,e
        },{
            status:500
        });
    }
}