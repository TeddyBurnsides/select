import { IColor } from "../types/IColor";
import { FaCheck } from "react-icons/fa";

interface Props {
    colors: IColor[];
    selectedColor: IColor | undefined;
    onChange: (color: IColor) => void;
}

const ColorPicker = ({ colors, onChange, selectedColor }: Props) => {
    return (
        <div className="flex flex-wrap gap-2">
            {colors.map((color) => {
                const isSelected = color.hex === selectedColor?.hex;
                return (
                    <button
                        type="button"
                        key={color.hex}
                        className={`rounded text-white text-xs outline outline-1 outline-transparent hover:outline-black/20 focus:outline-black/20 ${
                            isSelected ? "outline-black/20" : ""
                        } `}
                        onClick={() => onChange(color)}
                        title={`Select the ${color.name} color`}
                    >
                        <div
                            style={{ background: color.hex }}
                            className="flex items-center justify-center border-4 border-white h-8 w-8 rounded-full"
                        >
                            {isSelected && <FaCheck />}
                        </div>
                    </button>
                );
            })}
        </div>
    );
};

export default ColorPicker;
