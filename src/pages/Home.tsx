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
    // multi-select state
    const [selectedItems, setSelectedItems] = useState<IIdName[]>([
        fakeData[5],
        fakeData[4],
        fakeData[3],
    ]);

    // color picker state
    const [color, setColor] = useState<IColor>();

    // single select api state
    const [selectedItemApi, setSelectedItemApi] = useState<IIdName | null>(
        fakeData[7]
    );

    // single select state
    const [selectedItem, setSelectedItem] = useState<IIdName | null>(
        fakeData[3]
    );

    return (
        <div className="px-10 flex flex-col space-y-10 mt-10">
            <ComponentLabel label="Multi-Select">
                <MultiSelect
                    onItemRemove={(item) =>
                        setSelectedItems((prev) => [
                            ...prev.filter((x) => x.id !== item.id),
                        ])
                    }
                    onItemSelect={(item) =>
                        setSelectedItems((prev) => [...prev, item])
                    }
                    selectedItems={selectedItems}
                    lookupFunction={fakeApiCall}
                    label="Select fruits"
                    debounceInMilliseconds={600}
                    placeholder="Search..."
                />
            </ComponentLabel>
            <ComponentLabel label="Single-Select API">
                <SingleSelect
                    onUpdate={(item) => setSelectedItemApi(item)}
                    selectedItem={selectedItemApi}
                    lookupFunction={fakeApiCall}
                    label="Select a fruit from our database"
                    debounceInMilliseconds={600}
                    placeholder="Search..."
                />
            </ComponentLabel>
            <ComponentLabel label="Single-Select">
                <SingleSelect
                    onUpdate={(item) => setSelectedItem(item)}
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
