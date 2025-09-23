import {useState} from "react";
import VoteCard from "./vote-card";
import {noop} from "../utils/utils";

const values = ["☕", "1", "2", "3", "5", "8", "13", "?"];

export default function PokerPlanning() {
    const [selected, setSelected] = useState<string | null>(null);
    const [revealed, setRevealed] = useState<boolean>(false);
    const [votes] = useState<string[]>([]);
    const selectCard = (value: string): void => {
        if (revealed) return;
        setSelected(value);
    }

    const revealVotes = (): void => {
        setRevealed(true);
    }

    return (
        <>
            <div className="flex gap-4 justify-center mt-8">
                <button
                    onClick={revealVotes}
                    className="px-6 py-3 rounded-xl bg-primary hover:bg-secondary text-white"
                >
                    Révéler
                </button>
                <button
                    onClick={() => {
                        setRevealed(false);
                        setSelected(null);
                    }}
                    className="px-6 py-3 rounded-xl bg-primary hover:bg-secondary text-white"
                >
                    Réinitialiser
                </button>
            </div>

            <div className={"flex flex-wrap gap-4 justify-center mt-8"}>
                {values.map((value) => (
                    <VoteCard value={value} isSelected={selected === value} onSelect={selectCard}/>))
                }
            </div>

            {revealed && (
                <div className="mt-8 text-xl text-center">
                    Résultats
                </div>
            )}
            {revealed && (votes?.length ? (
                    votes.map(vote => (
                        <VoteCard value={vote}
                                  isSelected={false}
                                  onSelect={noop}
                        />
                    ))) : (<div className="mt-4 text-center">Aucun vote</div>)
            )
            }
        </>
    );
}
