import { parseCookie } from "solid-start";
import { Admins, knexInstance } from "./database";


export async function isLoggedIn(r: Request) {
    const cookies = parseCookie(r.headers.get("Cookie") ?? "")

    const res = await knexInstance<Admins>("admins")
        .select("*")
        .from("admins")
        .where({secret: cookies["secret"]??"aaa"})    

    return res[0]
}

export async function logIn(user: string, pass:string): Promise<string|false> {

    const res = await knexInstance<Admins>("admins")
        .select("*")
        .from("admins")
        .where({username: user, password: await hashPassword(pass)})

    if(res.length == 0) return false

    return res[0].secret
}

const passwordSeed = Buffer.from(crypto.getRandomValues(new Uint8Array(32))).toString("hex")

export async function hashPassword(password: string): Promise<string> {
    const hash = await crypto.subtle.digest("SHA-512", Buffer.from(password + passwordSeed))
    return Buffer.from(new Uint8Array(hash)).toString("hex")
}