import { useState } from "react";
import MultiSelect from "../components/MultiSelect";
import IIdName from "../types/IIdName";
import Pill from "../components/Pill";
import { fakeApiCall, fakeData } from "../constants/sampleMultiSelectValues";
import DateRange from "../components/DateRange";
import TextInput from "../components/TextInput";
import ColorPicker from "../components/ColorPicker";
import { IColor } from "../types/IColor";
import { Colors } from "../constants/Colors";

const Home = () => {
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

    return (
        <div className="max-w-xs mx-auto flex flex-col space-y-10 mt-10">
            <div>
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
            </div>
            <TextInput label="Company Name" />
            <DateRange />
            <ColorPicker
                onChange={setColor}
                colors={Colors}
                selectedColor={color}
            />
        </div>
    );
};

export default Home;
