import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import {useMutation} from "convex/react";
import {api} from "../convex/_generated/api";

const DEFAULT_FIBONACCI: string[] = ["1", "2", "3", "5", "8", "13", "?", "☕"];

export default function CreateRoom() {
    const [roomName, setRoomName] = useState<string>("");
    const [roomValues, setRoomValues] = useState<string>(DEFAULT_FIBONACCI.join(","));

    const navigate = useNavigate();
    const createRoom = useMutation(api.functions.rooms.createRoom);

    const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!roomName || !roomName.trim().length) {
            return;
        }
        let eligibleValues = roomValues
            .split(",")
            .map(v => v.trim())
            .filter(v => v.length > 0);

        if (eligibleValues.length === 0) {
            eligibleValues = DEFAULT_FIBONACCI;
        }
        const roomId: string = await createRoom({roomName, eligibleValues});
        navigate(`/room/${roomId}/login`);
    }

    const onRoomNameChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setRoomName(e.target.value);
    }

    const onRoomValuesChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setRoomValues(e.target.value);
    }

    return (
        <div className={"flex flex-col items-center gap-4 mb-auto"}>
            <h1 className={"text-4xl mt-4"}>Créer une room</h1>
            <form className={"flex flex-col gap-4 mt-4 w-80"} onSubmit={submitForm}>
                <input type="text"
                       placeholder={"Nom de la room"}
                       className={"border border-primary-300 p-2 rounded"}
                       value={roomName}
                       onChange={onRoomNameChange}
                />

                <input type="text"
                       placeholder={"Ex: 1,2,3,5,8,13,?"}
                       className={"border border-primary-300 p-2 rounded"}
                       value={roomValues}
                       onChange={onRoomValuesChange}
                />
                <button type={"submit"}>Créer</button>
            </form>
        </div>
    );

}