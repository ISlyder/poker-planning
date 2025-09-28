import React, {FormEvent, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {useMutation} from "convex/react";
import {api} from "../convex/_generated/api";
import {getUserNameFromLocalStorage, User} from "./user";
import {Id} from "../convex/_generated/dataModel";

export default function Login() {
    const [name, setName] = useState<string>(getUserNameFromLocalStorage() ?? "");
    const params = useParams();
    const roomId: string | undefined = params.id;
    const navigate = useNavigate();
    const createUser = useMutation(api.functions.users.createUser);
    const addUserToRoom = useMutation(api.functions.room_users.addUserToRoom);

    const submitForm = async (e: FormEvent<HTMLFormElement>) => {
        if (!name || !name.trim().length) return;
        e.preventDefault();
        if (!roomId) {
            throw new Error("No room ID found in URL");
        }
        if (getUserNameFromLocalStorage() === name) {
            navigate(`/room/${roomId}`);
            return;
        }
        const userId: string = await createUser({name});
        const user: User = {_id: userId, name};
        localStorage.setItem("user", JSON.stringify(user));
        await addUserToRoom({roomId: roomId as Id<"rooms">, userId: userId as Id<"users">});
        navigate(`/room/${roomId}`);
    };

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setName(e.target.value);
    }

    return (
        <div className={"flex flex-col items-center h-screen gap-4"}>
            <h1 className={"text-4xl mt-4"}>Rejoindre une room</h1>
            <form className={"flex flex-col gap-4"}
                  onSubmit={submitForm}
            >
                <div className={"flex gap-2 justify-center items-center"}>
                    <label>Entrez votre nom</label>
                    <input type="text"
                           placeholder={"Nom"}
                           value={name}
                           className={"border border-primary-300 p-2 rounded"}
                           onChange={handleNameChange}/>
                    <button type={"submit"} className={"bg-primary text-white p-2 rounded"}>Rejoindre</button>
                </div>
            </form>
        </div>
    );
}