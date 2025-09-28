import {mutation, query} from "../_generated/server";
import {v} from "convex/values";

export const createRoom = mutation({
    args: {roomName: v.string(), eligibleValues: v.array(v.string())},
    handler: async (ctx, args) => {
        return ctx.db.insert("rooms", {name: args.roomName, revealedVotes: false, eligibleValues: args.eligibleValues});
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

export const getRoom = query({
    args: {roomId: v.id("rooms")},
    handler: async (ctx, args) => {
        const room = await ctx.db.get(args.roomId);
        if (!room) throw new Error("Room not found");

        const votes = await ctx.db
            .query("votes")
            .withIndex("by_room", q => q.eq("roomId", args.roomId))
            .collect();

        return {
            revealed: room.revealedVotes,
            eligibleValues: room.eligibleValues,
            votes,
        };
    },
});