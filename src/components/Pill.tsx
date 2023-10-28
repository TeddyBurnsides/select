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
                "flex space-x-2 items-center rounded bg-blue-500/90 text-white px-2 py-1 text-sm",
                className
            )}
        >
            <div className="truncate max-w-[12rem]">{item.name}</div>
            <button
                onClick={() => onDelete(item)}
                type="button"
                className="rounded-full px-1 hover:bg-white/30"
            >
                ✖
            </button>
        </div>
    );
};

export default Pill;
