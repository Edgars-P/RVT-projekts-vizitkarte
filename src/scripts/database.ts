import { Faker, faker } from "@faker-js/faker";
import knex, { Knex } from "knex";
import { hashPassword } from "./login";

const config: Knex.Config = {
  client: "sqlite3",
  connection: {
    filename: `/tmp/${crypto.randomUUID()}.db`,
  },
};

export const knexInstance = knex(config);

export interface Blogs {
  id: number;
  name: string;
  content: string;
  date: any;
}
await knexInstance.schema.createTable("blogs", (t) => {
  t.increments("id", { primaryKey: true });
  t.string("name");
  t.string("content");
  t.date("date");
});

export interface Comment {
  id: number;
  author: string;
  content: string;
  article: number;
  date: any;
}
await knexInstance.schema.createTable("comments", (t) => {
  t.increments("id", { primaryKey: true });
  t.string("author");
  t.foreign("author").references("username").inTable("users");
  t.integer("article");
  t.foreign("article").references("id").inTable("blogs");
  t.string("content");
  t.date("date");
});

Array(10)
  .fill("")
  .map((_, i) => {
    return {
      id: i + 1,
      name: faker.lorem.sentence(4),
      content: "<p>" + faker.lorem.paragraphs(5, "</p><p>") + "</p>",
      date: faker.date.past(1),
    };
  })
  .forEach(async (e) => {
    await knexInstance<Blogs>("blogs").insert(e);
  });

export interface Contact {
  name: string;
  surname: string;
  email: string;
}
await knexInstance.schema.createTable("contacts", (t) => {
  t.increments("id", { primaryKey: true });
  t.string("name");
  t.string("surname");
  t.string("email");
});

export interface Reviews {
  name: string;
  stars: number;
  review: string;
}
await knexInstance.schema.createTable("reviews", (t) => {
  t.string("name");
  t.integer("stars");
  t.string("review");
  t.timestamps(false, true);
});

export interface Users {
  name: string;
  username: string;
  password: string;
  secret: string;
  isAdmin: boolean;
}
await knexInstance.schema.createTable("users", (t) => {
  t.string("name");
  t.string("username").primary();
  t.string("password");
  t.string("secret");
  t.boolean("isAdmin");
});

await knexInstance<Users>("users").insert({
  name: "Edgars Polis",
  username: "Edgars",
  password: await hashPassword("1234567890"),
  secret: Buffer.from(crypto.getRandomValues(new Uint8Array(16))).toString(
    "hex",
  ),
  isAdmin: false,
});

await knexInstance<Users>("users").insert({
  name: "Admin Edgars",
  username: "Admin",
  password: await hashPassword("qwertyuiopasdf"),
  secret: Buffer.from(crypto.getRandomValues(new Uint8Array(16))).toString(
    "hex",
  ),
  isAdmin: true,
});
