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
import ComponentLabel from "./ComponentLabel";
import SingleSelect from "../components/SingleSelect";

const Home = () => {
    // multi-select helpers

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

    // single select api helpers

    const [selectedItemApi, setSelectedItemApi] = useState<IIdName | undefined>(
        fakeData[7]
    );

    const addItemSingleApi = (newItem: IIdName) => {
        setSelectedItemApi(newItem);
    };

    const removeItemSingleApi = (item: IIdName) => {
        setSelectedItemApi(undefined);
    };

    // single select helpers

    const [selectedItem, setSelectedItem] = useState<IIdName | undefined>(
        fakeData[3]
    );

    const addItemSingle = (newItem: IIdName) => {
        setSelectedItem(newItem);
    };

    const removeItemSingle = (item: IIdName) => {
        setSelectedItem(undefined);
    };

    return (
        <div className="px-10 flex flex-col space-y-10 mt-10">
            <ComponentLabel label="Multi-Select">
                <MultiSelect
                    onItemRemove={removeItem}
                    onItemSelect={addItem}
                    selectedItems={selectedItems}
                    lookupFunction={fakeApiCall}
                    label="Select fruits"
                    debounceInMilliseconds={600}
                    placeholder="Search..."
                />
            </ComponentLabel>
            <ComponentLabel label="Single-Select API">
                <SingleSelect
                    onItemRemove={removeItemSingleApi}
                    onItemSelect={addItemSingleApi}
                    selectedItem={selectedItemApi}
                    lookupFunction={fakeApiCall}
                    label="Select a fruit from our database"
                    debounceInMilliseconds={600}
                    placeholder="Search..."
                />
            </ComponentLabel>
            <ComponentLabel label="Single-Select">
                <SingleSelect
                    onItemRemove={removeItemSingle}
                    onItemSelect={addItemSingle}
                    selectedItem={selectedItem}
                    items={fakeData}
                    label="Select a fruit"
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
        </div>
    );
};

export default Home;
