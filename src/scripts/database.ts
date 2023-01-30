import knex, { Knex } from 'knex'

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

const config: Knex.Config = {
    client: 'sqlite3',
    connection: {
        filename: `/tmp/${crypto.randomUUID()}.db`,
    },
};

export const knexInstance = knex(config);


await knexInstance
    .schema
    .createTable('blogs', t => {
        t.increments('id', {primaryKey: true})
        t.string('name')
        t.string('content')
        t.date('date')
    })

await knexInstance
    .schema
    .createTable('contacts', t => {
        t.increments('id', {primaryKey: true})
        t.string('name')
        t.string('surname')
        t.string('email')
    })

await knexInstance<Blogs>('blogs').insert({
    name: "Testa ieraksts 1",
    content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim sapientiam, temperantiam, fortitudinem copulatas esse docui cum voluptate, ut ab Homero Ennius, Afranius a Menandro solet. Nec vero, ut noster Lucilius, recusabo, quo minus id, quod quaeritur, sit pulcherrimum. Etenim si delectamur.`,
    date: Date.now()
})

await knexInstance<Contact>('contacts').insert({
    name: "111222333",
    surname: "111222333",
    email: "111222333",
  })