import {useState} from "react";
import VoteCard from "./vote-card";
import {useMutation, useQuery} from "convex/react";
import {api} from "../convex/_generated/api";
import {useParams} from "react-router-dom";
import {Id} from "../convex/_generated/dataModel";
import {getUserFromLocalStorage} from "../user/user";
import {noop} from "../utils/utils";

const values = ["☕", "1", "2", "3", "5", "8", "13", "?"];

interface RoomDto {
    revealed: boolean;
    votes: Vote[];
}

interface Vote {
    _id: Id<"votes">;
    roomId: Id<"rooms">;
    userId: Id<"users">;
    value: string;
    _creationTime?: number;
}

export default function PokerPlanning() {
    const [selected, setSelected] = useState<string | null>(null);
    const params = useParams();
    const roomId = params.id as Id<"rooms">;
    const userId = getUserFromLocalStorage()?._id as Id<"users">;
    const room: RoomDto | undefined = useQuery(api.functions.rooms.getVotesForRoom, {roomId});
    const revealVotesFromRoom = useMutation(api.functions.rooms.setRevealVotes);
    const updateVote = useMutation(api.functions.votes.addOrUpdateVote);
    const resetVotes = useMutation(api.functions.votes.resetVotes);

    const selectCard = (selectedValue: string): void => {
        if (room?.revealed) return;
        setSelected(selectedValue);
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

    const userVote = async (): Promise<void> => {
        if (!room || room.revealed || !selected) return;
        if (!userId) throw new Error("User not found");
        await updateVote({roomId, userId, value: selected});
    }

    return (
        <>
            <div className="flex gap-4 justify-center mt-8">
                <button
                    onClick={reveal}
                    className="px-6 py-3 rounded-xl bg-primary hover:bg-secondary text-white"
                >
                    Révéler
                </button>
                <button
                    onClick={reinitRoom}
                    className="px-6 py-3 rounded-xl bg-primary hover:bg-secondary text-white"
                >
                    Réinitialiser
                </button>
            </div>

            <div className={"flex flex-wrap gap-4 justify-center mt-8"}>
                {values.map((value) => (
                    <VoteCard key={value} value={value} isSelected={selected === value} onSelect={selectCard}/>))
                }
            </div>

            <button className={"px-6 py-3 rounded-xl bg-primary hover:bg-secondary text-white"}
                    onClick={userVote}
            >Voter</button>

            {room?.revealed && (
                <div className="mt-8 text-xl text-center">
                    Résultats
                </div>
            )}
            {room?.revealed && (room?.votes?.length ? (
                    room?.votes.map((vote: Vote) => (
                        <VoteCard value={vote.value}
                                  isSelected={false}
                                  onSelect={noop}
                                  key={vote._id}
                        />
                    ))) : (<div className="mt-4 text-center">Aucun vote</div>)
            )
            }
        </>
    );
}
