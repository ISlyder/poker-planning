import {mutation, query} from "../_generated/server";
import {Doc, Id} from "../_generated/dataModel";

export const list = query(async ({db}): Promise<Doc[]> => {
    return await db.query("votes").collect();
});

export const add = mutation(async ({db}, {value}: { value: number }): Promise<Id<"votes">> => {
    return await db.insert("votes", {value});
});