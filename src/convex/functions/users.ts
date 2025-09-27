import {mutation} from "../_generated/server";
import {v} from "convex/values";

export const createUser = mutation({
    args: {name: v.string()},
    handler: async (ctx, args) => {
        return ctx.db.insert("users", {name: args.name});
    }
});