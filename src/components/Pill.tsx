import { twMerge } from "tailwind-merge";
import IIdName from "../types/IIdName";

interface Props {
    item: IIdName;
    onDelete: (item: IIdName) => void;
    className?: string;
}

const Pill = ({ item, onDelete, className }: Props) => {
    return (
        <div
            className={twMerge(
                "flex space-x-1 items-center rounded bg-blue-500/10 text-blue-800/70 px-2 py-1",
                className
            )}
        >
            <div className="truncate">{item.name}</div>
            <button
                onClick={() => onDelete(item)}
                type="button"
                className="rounded-full text-lg px-1 h-5 hover:bg-blue-500/30 focus:outline-none focus:bg-blue-500/30"
            >
                <span className="relative -top-1">&times;</span>
            </button>
        </div>
    );
};

export default Pill;
