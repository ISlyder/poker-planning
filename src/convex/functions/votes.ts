import {mutation} from "../_generated/server";
import {v} from "convex/values";

export const addOrUpdateVote = mutation({
    args: {
        roomId: v.id("rooms"),
        userId: v.id("users"),
        value: v.string(),
    },
    handler: async (ctx, args) => {
        const existing = await ctx.db
            .query("votes")
            .withIndex("by_room", (q) => q.eq("roomId", args.roomId))
            .first();
        // The query above should also filter by userId to ensure each user has only one vote per room.

        if (existing) {
            await ctx.db.patch(existing._id, { value: args.value });
        } else {
            await ctx.db.insert("votes", {
                roomId: args.roomId,
                userId: args.userId,
                value: args.value,
            });
        }
    },
});

export const resetVotes = mutation({
    args: {
        roomId: v.id("rooms"),
    },
    handler: async (ctx, args) => {
        const votes = await ctx.db
            .query("votes")
            .withIndex("by_room", q => q.eq("roomId", args.roomId))
            .collect();

        for (const vote of votes) {
            await ctx.db.delete(vote._id);
        }
    },
});