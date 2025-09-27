import {mutation} from "../_generated/server";
import {v} from "convex/values";

export const addUserToRoom = mutation({
    args: {roomId: v.id('rooms'), userId: v.id('users')},
    handler: async (ctx, args) => {
        return ctx.db.insert("room_users", {roomId: args.roomId, userId: args.userId});
    }
});