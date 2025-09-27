import {defineSchema, defineTable} from "convex/server";
import {v} from "convex/values";

export default defineSchema({
    votes: defineTable({
        roomId: v.id("rooms"),
        userId: v.id("users"),
        value: v.string(),
    })
        .index("by_room", ["roomId"]),

    rooms: defineTable({
        name: v.string(),
        revealedVotes: v.boolean(),
    }),

    users: defineTable({
        name: v.string(),
    }),

    room_users: defineTable({
        roomId: v.id('rooms'),
        userId: v.id('users'),
    })
});

