import {mutation, query} from "../_generated/server";
import {v} from "convex/values";

export const createRoom = mutation({
    args: {roomName: v.string()},
    handler: async (ctx, args) => {
        return ctx.db.insert("rooms", {name: args.roomName, revealedVotes: false});
    }
});

export const setRevealVotes = mutation({
    args: {
        roomId: v.id("rooms"),
        reveal: v.boolean(),
    },
    handler: async (ctx, args) => {
        await ctx.db.patch(args.roomId, {
            revealedVotes: args.reveal,
        });
    },
});

export const getVotesForRoom = query({
    args: { roomId: v.id("rooms") },
    handler: async (ctx, args) => {
        const room = await ctx.db.get(args.roomId);
        const votes = await ctx.db
            .query("votes")
            .withIndex("by_room", q => q.eq("roomId", args.roomId))
            .collect();

        return {
            revealed: room?.revealedVotes ?? false,
            votes,
        };
    },
});