import {mutation} from "../_generated/server";
import {v} from "convex/values";

export const addOrUpdateVote = mutation({
    args: {
        roomId: v.id("rooms"),
        userId: v.id("users"),
        value: v.string(),
    },
    handler: async (ctx, args) => {
        const existingVotes = await ctx.db
            .query("votes")
            .withIndex("by_room_user", q =>
                q.eq("roomId", args.roomId).eq("userId", args.userId)
            )
            .collect();

        if (existingVotes.length > 0) {
            const existingVote = existingVotes[0];
            await ctx.db.patch(existingVote._id, {value: args.value});
            return existingVote._id;
        }
        else {
            return await ctx.db.insert("votes", {
                roomId: args.roomId,
                userId: args.userId,
                value: args.value,
            });
        }
    }
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