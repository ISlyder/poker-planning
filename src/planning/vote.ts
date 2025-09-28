import {Id} from "../convex/_generated/dataModel";

export interface Vote {
    _id: Id<"votes">;
    roomId: Id<"rooms">;
    userId: Id<"users">;
    userName: string;
    value: string;
    _creationTime?: number;
}