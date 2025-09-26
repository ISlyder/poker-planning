import {Link} from "react-router";

export default function NotFoundPage() {
    return (
        <div className={"flex flex-col items-center justify-center h-screen gap-4"}>
            <h1 className="">Not Found...</h1>
            <Link to={"/"}>
                <button className="bg-primary text-white p-2 rounded">Revenir à l'accueil</button>
            </Link>
        </div>
    );
}