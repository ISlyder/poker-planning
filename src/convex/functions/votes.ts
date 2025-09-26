import {mutation, query} from "../_generated/server";
import {v} from "convex/values";

export const getVotes = query({
    args: {},
    handler: async (ctx, args) => {
       return  ctx.db.query("votes")
            .collect();
    }
});

export const addVote = mutation({
    args: {value: v.string()},
    handler: async (ctx, args) => {
        return ctx.db.insert("votes", {value: args.value});
    }
});