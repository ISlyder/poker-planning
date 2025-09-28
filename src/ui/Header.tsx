import {Link} from "react-router";
import logo from "../assets/main-logo.png";
import React, {useState} from "react";
import {useLocation} from "react-router-dom";

export default function Header() {
    const roomId: string = window.location.pathname.split("/")[2];
    const [showPopup, setShowPopup] = useState(false);
    const [successfullyCopied, setSuccessfullyCopied] = useState(false);

    const location = useLocation();
    const shouldShowInviteButton: boolean = location.pathname.startsWith("/room/");

    const inviteSomeone = (): void => {
        if (!roomId) throw new Error("No room ID found in URL");
        const inviteUrl = `${window.location.origin}/room/${roomId}/login`;
        navigator.clipboard.writeText(inviteUrl).then(() => {
            setSuccessfullyCopied(true);
            setShowPopup(true);
            setTimeout(() => setShowPopup(false), 3000);
        }).catch((err) => {
            setSuccessfullyCopied(false)
            setShowPopup(true);
            setTimeout(() => setShowPopup(false), 3000);
            console.error('Could not copy text: ', err);
        });
    }

    return (
        <header className="bg-primary text-white p-4 flex justify-between">
            <Link to={"/"} className={"flex items-center gap-4"}>
                <img src={logo} className={"h-10 w-10"} alt={"Logo"}/>
                <h1 className="text-2xl font-bold">Poker planning Infra&IOT Team</h1>
            </Link>
            {shouldShowInviteButton &&
                <button className={"button-secondary"} onClick={inviteSomeone}>Inviter</button>
            }
            {showPopup && (
                <div className="absolute bg-primary text-white px-4 py-2 rounded shadow-lg z-50"
                        style={{top: '80px', right: '10px'}}
                >
                    {successfullyCopied ? `✅ Lien copié avec succès ! ✅` : `❌ Échec de la copie du lien ❌`}

                </div>
            )}
        </header>
    );
}
