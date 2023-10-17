import { useState } from "react";
import MultiSelect from "./components/select";
import IIdName from "./types/IIdName";
import "./css/output.css";
import Pill from "./components/pill";
import { fakeApiCall, fakeData } from "./utils/fakeData";
import ColorPicker from "./components/color-picker";
import { IColor } from "./components/color-picker/IColor";
import { Colors } from "./components/color-picker/Colors";

const App = () => {
    const [selectedItems, setSelectedItems] = useState<IIdName[]>([
        fakeData[5],
    ]);

    const [color, setColor] = useState<IColor>();

    const addItem = (newItem: IIdName) => {
        setSelectedItems((prev) => [...prev, newItem]);
    };

    const removeItem = (item: IIdName) => {
        setSelectedItems((prev) => [...prev.filter((x) => x.id !== item.id)]);
    };

    const h2Class = "text-lg pt-6 pb-3";

    return (
        <div className="max-w-xs mx-auto">
            <h2 className={h2Class}>Multi-select:</h2>
            <div className="py-2 flex gap-2 flex-wrap">
                {selectedItems.map((x) => (
                    <Pill key={x.id} item={x} onDelete={removeItem} />
                ))}
            </div>
            <MultiSelect
                onItemSelect={addItem}
                selectedItems={selectedItems}
                lookupFunction={fakeApiCall}
                label="Search for fruit"
                debounceInMilliseconds={200}
            />
            <h2 className={h2Class}>Color Picker:</h2>
            <ColorPicker
                onChange={setColor}
                colors={Colors}
                selectedColor={color}
            />
        </div>
    );
};

export default App;
