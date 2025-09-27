import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import {useMutation} from "convex/react";
import {api} from "../convex/_generated/api";

export default function CreateRoom() {
   const [roomName, setRoomName] = useState<string>("");

   const navigate = useNavigate();
   const createRoom = useMutation(api.functions.rooms.createRoom);

    const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
        if (!roomName || !roomName.trim().length) {
            return;
        }
        e.preventDefault();
        const roomId: string = await createRoom({roomName});
        navigate(`/login?room=${roomId}`);
    }

    const onRoomNameChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setRoomName(e.target.value);
    }

    return (
        <div className={"flex flex-col items-center h-screen gap-4"}>
            <h1 className={"text-4xl mt-4"}>Créer une room</h1>
            <form className={"flex flex-col gap-4"} onSubmit={submitForm}>
                <div className={"flex gap-2 justify-center items-center"}>
                    <label>Nom de la room</label>
                    <input type="text"
                            placeholder={"Nom de la room"}
                            className={"border border-primary-300 p-2 rounded"}
                           value={roomName}
                           onChange={onRoomNameChange}
                    />
                      <button type={"submit"} className={"bg-primary text-white p-2 rounded"}>Créer</button>
                 </div>
                </form>
          </div>
     );

}