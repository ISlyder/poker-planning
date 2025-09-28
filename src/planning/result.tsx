import React from 'react';
import {isReadable} from "node:stream";

export type Player = {
    name: string;
    card: string;
};

type Props = {
    players: Player[];
    isRevealed: boolean;
    reinitRoom: () => void;
    reveal: () => void;
};

export default function Result(props: Props) {
    const tableWidth = 700;
    const tableHeight = 400;
    const cardsRadius = 200;
    const centerX = tableWidth / 2;
    const centerY = tableHeight / 2;

    return (
        <div className="relative" style={{width: tableWidth, height: tableHeight}}>
            <div
                className="absolute bg-black rounded-full"
                style={{
                    width: tableWidth,
                    height: tableHeight,
                    top: centerY - tableHeight / 2,
                    left: centerX - tableWidth / 2,
                }}
            ></div>
            {props.isRevealed ? (
                <button
                    onClick={props.reinitRoom}
                    className="absolute px-6 py-3 rounded-xl bg-white hover:bg-gray-400 text-primary"
                    style={{
                        top: centerY - 20,
                        left: centerX - 60,
                    }}
                >
                    Réinitialiser
                </button>) : (
                <button
                    onClick={props.reveal}
                    className="absolute px-6 py-3 rounded-xl bg-white hover:bg-gray-400 text-primary"
                    style={{
                        top: centerY - 20,
                        left: centerX - 50,
                    }}
                >
                    Révéler
                </button>
            )
            }
            {props.players.map((player, index) => {
                const angle = (index / props.players.length) * 2 * Math.PI - Math.PI / 2;
                const x = centerX + cardsRadius * Math.cos(angle);
                const y = centerY + cardsRadius * Math.sin(angle);
                return (
                    <div
                        key={index}
                        className="absolute"
                        style={{
                            top: y,
                            left: x,
                            transform: 'translate(-50%, -50%)',
                        }}
                    >
                        <div className="bg-white border border-gray-400 rounded shadow p-4 flex flex-col">
                            <span>{player.name}</span>
                            <span className={"text-2xl text-center"}>{props.isRevealed ? player.card : "⏳"}</span>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
