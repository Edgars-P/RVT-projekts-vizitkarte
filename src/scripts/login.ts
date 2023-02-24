import { parseCookie } from "solid-start";
import { Users, knexInstance } from "./database";


export async function getLogin(r: Request): Promise<Users> {
    const cookies = parseCookie(r.headers.get("Cookie") ?? "")

    const res = await knexInstance<Users>("users")
        .select("*")
        .from("users")
        .where({secret: cookies["secret"]??"aaa"})

    console.log(res);
    

    return res[0]
}

export async function logIn(user: string, pass:string): Promise<string|false> {

    console.log(user, pass, hashPassword(pass));
    

    const res = await knexInstance<Users>("users")
        .select("*")
        .from("users")
        .where({username: user, password: await hashPassword(pass)})

    console.log(res);

    if(res.length == 0) return false

    return res[0].secret
}

const passwordSeed = Buffer.from(crypto.getRandomValues(new Uint8Array(32))).toString("hex")

export async function hashPassword(password: string): Promise<string> {
    const hash = await crypto.subtle.digest("SHA-512", Buffer.from(password + passwordSeed))
    return Buffer.from(new Uint8Array(hash)).toString("hex")
}