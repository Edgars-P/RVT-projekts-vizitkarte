import knex, { Knex } from "knex"
import { hashPassword } from "./login"

export interface Blogs {
    id: number,
    name: string,
    content: string,
    date: any
}

export interface Contact {
    name: string,
    surname: string,
    email: string
}

export interface Reviews {
    name: string,
    stars: number,
    review: string
}

export interface Users {
    username: string,
    password: string,
    secret: string,
    isAdmin: boolean
}

const config: Knex.Config = {
    client: "sqlite3",
    connection: {
        filename: `/tmp/${crypto.randomUUID()}.db`,
    },
};

export const knexInstance = knex(config);


await knexInstance
    .schema
    .createTable("blogs", t => {
        t.increments("id", { primaryKey: true })
        t.string("name")
        t.string("content")
        t.date("date")
    })

await knexInstance<Blogs>("blogs")
    .insert({
        name: "Testa ieraksts 1",
        content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim sapientiam, temperantiam, fortitudinem copulatas esse docui cum voluptate, ut ab Homero Ennius, Afranius a Menandro solet. Nec vero, ut noster Lucilius, recusabo, quo minus id, quod quaeritur, sit pulcherrimum. Etenim si delectamur.`,
        date: Date.now()
    })

await knexInstance
    .schema
    .createTable("contacts", t => {
        t.increments("id", { primaryKey: true })
        t.string("name")
        t.string("surname")
        t.string("email")
    })

await knexInstance
    .schema
    .createTable("reviews", t => {
        t.string("name")
        t.integer("stars")
        t.string("review")
        t.timestamps(false, true)
    })

await knexInstance
    .schema
    .createTable("users", t => {
        t.string("username")
        t.string("password")
        t.string("secret")
        t.boolean("isAdmin")
    })

await knexInstance<Users>("users")
    .insert({
        username: "Edgars",
        password: await hashPassword("1234567890"),
        secret: Buffer.from(crypto.getRandomValues(new Uint8Array(16))).toString("hex"),
        isAdmin: true
    })
