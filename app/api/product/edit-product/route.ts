import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req:NextRequest,res:NextResponse){

    try{
        const { productName, productDescription, productImage, id, productId } = await req.json();

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

        const isProductExists = await prisma.product.findFirst({
            where:{
                id: productId,
                userId:{
                    has:id
                }
            },
            
        });

        if(!isProductExists) return NextResponse.json({
            error:"Product doesn't exists"
        },{
            status:400
        })

        const product = await prisma.product.update({
            data:{
                description:productDescription,
                name:productName,
                image:productImage,
            },
            where:{
                id:productId
            }
        });

        return NextResponse.json({
            product
        },{
            status:201
        })
    }
    catch(e){
        console.log(`Error in edit-product PUT req`,e);
        return NextResponse.json({
            error:`Error in edit-product PUT req`,e
        },{
            status:500
        });
    }
}