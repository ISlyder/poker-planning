import { query, mutation } from "../_generated/server";
import {Doc, Id} from "../_generated/dataModel";

// @ts-ignore
export const list = query(async ({ db }): Promise<Doc[]> => {
    return await db.query("votes").collect();
});

// @ts-ignore
export const add = mutation(async ({ db }, { value }: { value: number }): Promise<Id<"votes">> => {
    return await db.insert("votes", { value });
});