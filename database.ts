import { Database, SQLite3Connector, Model, DataTypes } from "https://deno.land/x/denodb@v1.2.0/mod.ts";

// Izveido datubāzi temp failā
const dbFile = await Deno.makeTempFile()
const connector = new SQLite3Connector({
  filepath: dbFile,
});

const db = new Database(connector);

// Definē sql tabulas

export class Atsauksmes extends Model {
  static table = "atsauksmes"

  static fields = {
    vards: DataTypes.string(20),
    reitings: DataTypes.INTEGER,
    teksts: DataTypes.string(200)
  }
}

export class Blogs extends Model {
  static table = "blogs"

  static fields = {
    virsraksts: DataTypes.TEXT,
    saturs: DataTypes.TEXT
  }
}

export class Skatijumi extends Model {
  static table = "skatijumi"

  static fields = {
    url: {
      type: DataTypes.TEXT,
      primaryKey: true
    },

    skatijumi: DataTypes.INTEGER
  }
}

// Iedod klases datubāzei 
db.link([Atsauksmes, Blogs, Skatijumi]);
await db.sync()