import IIdName from "../types/IIdName";

interface Props {
    item: IIdName;
    onDelete: (item: IIdName) => void;
}

const Pill = ({ item, onDelete }: Props) => {
    return (
        <div className="flex space-x-2 items-center rounded bg-blue-500 text-white px-3 py-2">
            <span>{item.name}</span>
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
