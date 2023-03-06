import { parseCookie } from "solid-start";
import { knexInstance, Users } from "./database";

export async function getLogin(r: Request): Promise<Users> {
	const cookies = parseCookie(r.headers.get("Cookie") ?? "");

	const res = await knexInstance<Users>("users")
		.select("*")
		.from("users")
		.where({ secret: cookies["secret"] ?? "aaa" });

	return res[0];
}

export async function logIn(
	user: string,
	pass: string,
): Promise<Users | false> {
	const res = await knexInstance<Users>("users")
		.select("*")
		.from("users")
		.where({ username: user, password: await hashPassword(pass) });

	console.log(res);

	if (res.length == 0) return false;

	return res[0];
}

export async function register(userObj: Users): Promise<number[]|"ERROR"> {
	try {
		const res = await knexInstance<Users>("users")
			.insert({
				name: userObj.name,
				username: userObj.username,
				password: await hashPassword(userObj.password),
				secret: Buffer.from(crypto.getRandomValues(new Uint8Array(16)))
					.toString("hex"),
				isAdmin: false,
			})
		console.log(typeof res);

		return res;
	} catch {
		return "ERROR";
	}
}

const passwordSeed = Buffer.from(crypto.getRandomValues(new Uint8Array(32)))
	.toString("hex");

export async function hashPassword(password: string): Promise<string> {
	const hash = await crypto.subtle.digest(
		"SHA-512",
		Buffer.from(password + passwordSeed),
	);
	return Buffer.from(new Uint8Array(hash)).toString("hex");
}
