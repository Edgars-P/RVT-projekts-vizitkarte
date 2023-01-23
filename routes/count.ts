import { Handlers } from "$fresh/server.ts";
import { Model } from "https://deno.land/x/denodb@v1.2.0/lib/model.ts";
import { Skatijumi } from "../database.ts";

export const handler: Handlers = {
  async GET(req, ctx) {
    const q = new URL(req.url).searchParams

    const currentCount: Model|undefined = await Skatijumi.find(q.get("path") ?? "a")
    

    if(!currentCount) {
      Skatijumi.create({
        url: q.get("path") ?? "a",
        skatijumi: 1
      })
    } else {
      console.log(currentCount.skatijumi);
      currentCount.skatijumi = (currentCount.skatijumi as number)+=1
      await currentCount.update()
    }
    console.log(currentCount);
    

    return new Response((currentCount?.skatijumi ?? 1).toString())
  },
};