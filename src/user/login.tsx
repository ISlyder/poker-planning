import React, {FormEvent, useState} from "react";

export default function Login() {
    const [name, setName] = useState<string | null>(null);

    const submitForm = (e: FormEvent<HTMLFormElement>) => {
        if (!name || !name.trim().length) {
            return;
        }
        e.preventDefault();

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
                           className={"border border-primary-300 p-2 rounded"}
                           onChange={handleNameChange}/>
                    <button type={"submit"} className={"bg-primary text-white p-2 rounded"}>Rejoindre</button>
                </div>
            </form>
        </div>
    );
}