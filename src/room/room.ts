import {Vote} from "../planning/vote";

export interface RoomResponse {
    revealed: boolean;
    eligibleValues: string[];
    votes: Vote[];
}