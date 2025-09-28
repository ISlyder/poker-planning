import {Link} from "react-router";

export default function NotFoundPage() {
    return (
        <div className={"flex flex-col items-center justify-center h-screen gap-4"}>
            <h1>Not Found...</h1>
            <Link to={"/"}>
                <button>Revenir à l'accueil</button>
            </Link>
        </div>
    );
}