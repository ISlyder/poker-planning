import {useState} from "react";
import VoteCard from "./VoteCard";
import {useMutation, useQuery} from "convex/react";
import {api} from "../convex/_generated/api";
import {useParams} from "react-router-dom";
import {Id} from "../convex/_generated/dataModel";
import {getUserFromLocalStorage, User} from "../user/user";
import Result, {Player} from "./Result";
import {Vote} from "./vote";
import {RoomResponse} from "../room/room";

export default function PokerPlanning() {
    const [selected, setSelected] = useState<string | null>(null);
    const params = useParams();
    const roomId = params.id as Id<"rooms">;
    const user: User | null = getUserFromLocalStorage();

    const room: RoomResponse | undefined = useQuery(api.functions.rooms.getRoom, {roomId});
    const revealVotesFromRoom = useMutation(api.functions.rooms.setRevealVotes);
    const updateVote = useMutation(api.functions.votes.addOrUpdateVote);
    const resetVotes = useMutation(api.functions.votes.resetVotes);

    const selectCard = async (selectedValue: string): Promise<void> => {
        if (room?.revealed) return;
        const userId = user?._id as Id<"users">;
        const userName = user?.name;

        if (!userId) throw new Error("User ID is required to vote");
        if (!userName) throw new Error("User name is required to vote");

        setSelected(selectedValue);
        await updateVote({roomId, userId,  userName, value: selectedValue});
    }

    const reveal = async (): Promise<void> => {
        if (!room || room.revealed) return;
        await revealVotesFromRoom({roomId: roomId, reveal: true});
    }

    const hideVotes = async (): Promise<void> => {
        if (!room || !room.revealed) return;
        await revealVotesFromRoom({roomId, reveal: false});
    }

    const reinitRoom = async (): Promise<void> => {
        if (!room) return;
        setSelected(null);
        await hideVotes();
        await resetVotes({roomId});
    }

    const mapPlayers = (): Player[] => {
        return room?.votes.map((vote: Vote) => ({
            name: vote.userName ?? vote.userId.toString(),
            card: vote.value
        })) || [];
    }

    return (
        <div className={"flex flex-col items-center justify-between gap-20 p-4"}>
            <h1 className="text-4xl text-center">Place aux votes</h1>
                <Result players={mapPlayers()}
                        isRevealed={room?.revealed ?? false}
                        reinitRoom={reinitRoom}
                        reveal={reveal}
                />

            <div className={"flex flex-col items-center"}>
                <div className={"text-center"}>Choisis une carte :</div>
                <div className={"flex flex-wrap gap-4 justify-center mt-8"}>
                    {room?.eligibleValues.map((value) => (
                        <VoteCard key={value}
                                  value={value}
                                  isSelected={selected === value}
                                  onSelect={selectCard}
                        />))
                    }
                </div>
            </div>

        </div>
    );
}
