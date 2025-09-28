import {defineSchema, defineTable} from "convex/server";
import {v} from "convex/values";

export default defineSchema({
    votes: defineTable({
        roomId: v.id("rooms"),
        userId: v.id("users"),
        userName: v.string(),
        value: v.string(),
    })
        .index("by_room", ["roomId"])
        .index("by_room_user", ["roomId", "userId"]),

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

