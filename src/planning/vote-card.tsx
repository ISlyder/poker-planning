export type VoteCardProps = {
    value: string;
    isSelected: boolean;
    onSelect: (value: string) => void;
}
export default function VoteCard(props: VoteCardProps) {

    const onClick = () => {
        props.onSelect(props.value);
    }

    return (
        <>
            <button className={`rounded-lg text-white h-36 w-36 ${props.isSelected ? "bg-secondary" : "bg-primary"}`}
                    key={props.value}
                    onClick={onClick}>
                {props.value}
            </button>
        </>
    );
}