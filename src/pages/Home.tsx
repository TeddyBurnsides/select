import { useState } from "react";
import MultiSelect from "../components/MultiSelect";
import IIdName from "../types/IIdName";
import { fakeApiCall, fakeData } from "../constants/sampleMultiSelectValues";
import DateRange from "../components/DateRange";
import TextInput from "../components/TextInput";
import ColorPicker from "../components/ColorPicker";
import { IColor } from "../types/IColor";
import { Colors } from "../constants/Colors";
import DateInput from "../components/DateInput";
import Spinner from "../components/Spinner";

const Home = () => {
    const [selectedItems, setSelectedItems] = useState<IIdName[]>([
        fakeData[5],
        fakeData[4],
        fakeData[3],
    ]);
    const [color, setColor] = useState<IColor>();

    const addItem = (newItem: IIdName) => {
        setSelectedItems((prev) => [...prev, newItem]);
    };

    const removeItem = (item: IIdName) => {
        setSelectedItems((prev) => [...prev.filter((x) => x.id !== item.id)]);
    };

    return (
        <div className="max-w-md mx-auto flex flex-col space-y-10 mt-10">
            <div>
                <MultiSelect
                    onItemRemove={removeItem}
                    onItemSelect={addItem}
                    selectedItems={selectedItems}
                    lookupFunction={fakeApiCall}
                    label="Search for fruit"
                    debounceInMilliseconds={600}
                    placeholder="Search..."
                />
            </div>
            <div>
                <TextInput placeholder="Enter something" label="Company Name" />
            </div>
            <div>
                <DateInput label="Date" />
            </div>
            <div>
                <DateRange />
            </div>
            <div>
                <ColorPicker
                    onChange={setColor}
                    colors={Colors}
                    selectedColor={color}
                />
            </div>
            <div className="w-6 h-6">
                <Spinner className="h-full w-full" />
            </div>
        </div>
    );
};

export default Home;
