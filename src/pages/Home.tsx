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
import ComponentLabel from "./ComponentLabel";

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
        <div className="px-10 flex flex-col space-y-10 mt-10">
            <ComponentLabel label="Multi-Select">
                <MultiSelect
                    onItemRemove={removeItem}
                    onItemSelect={addItem}
                    selectedItems={selectedItems}
                    lookupFunction={fakeApiCall}
                    label="Search for fruit"
                    debounceInMilliseconds={600}
                    placeholder="Search..."
                />
            </ComponentLabel>
            <ComponentLabel label="Text Input">
                <TextInput placeholder="Enter something" label="Company Name" />
            </ComponentLabel>
            <ComponentLabel label="Date Input">
                <DateInput label="Date" />
            </ComponentLabel>
            <ComponentLabel label="Date Range">
                <DateRange />
            </ComponentLabel>
            <ComponentLabel label="Color Picker">
                <ColorPicker
                    onChange={setColor}
                    colors={Colors}
                    selectedColor={color}
                />
            </ComponentLabel>
            <ComponentLabel label="Spinner">
                <Spinner />
            </ComponentLabel>
        </div>
    );
};

export default Home;
