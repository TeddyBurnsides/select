import { useState } from "react";
import { IColor } from "../components/color-picker/IColor";
import { Colors } from "../components/color-picker/Colors";
import ColorPicker from "../components/color-picker";

const ColorPickerExample = () => {
    const [color, setColor] = useState<IColor>();

    const h2Class = "text-lg pt-6 pb-3";

    return (
        <div className="max-w-xs mx-auto">
            <h2 className={h2Class}>Color Picker:</h2>
            <ColorPicker
                onChange={setColor}
                colors={Colors}
                selectedColor={color}
            />
        </div>
    );
};

export default ColorPickerExample;
