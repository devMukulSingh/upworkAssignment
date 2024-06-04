import * as jose from "jose";

const secret = new TextEncoder().encode(process.env.NEXT_PUBLIC_JWT_SECRET);

export const jwtSign = async() => {
    try{
        const alg = 'HS256'
        const token = (
            await new jose.SignJWT().setProtectedHeader({alg}).sign(secret)
        ).toString();
        return token;
    }
    catch(e){
        console.log(`Error in jwtSign`,e);
    }
}

export const isAuth = async(token:string) => {
    try{
       const isAuth = await jose.jwtVerify(token,secret);
       return isAuth
    }
    catch(e){
        console.log(`Error in isAuth`,e);
    }
}