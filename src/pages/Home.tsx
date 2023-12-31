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
    const [multiSelectApiItems, setMultiSelectApiItems] = useState<IIdName[]>([
        fakeData[4],
        fakeData[3],
        fakeData[2],
        fakeData[1],
    ]);
    const [color, setColor] = useState<IColor>();
    const [singleSelectApiItem, setSingleSelectApiItem] =
        useState<IIdName | null>(fakeData[7]);
    const [singleSelectItem, setSingleSelectItem] = useState<IIdName | null>(
        fakeData[3]
    );

    return (
        <div className="px-10 flex flex-col space-y-10 mt-10">
            <ComponentLabel label="Multi-Select Async">
                <MultiSelect
                    onItemRemove={(item) =>
                        setMultiSelectApiItems((prev) => [
                            ...prev.filter((x) => x.id !== item.id),
                        ])
                    }
                    onItemSelect={(item) =>
                        setMultiSelectApiItems((prev) => [...prev, item])
                    }
                    selectedItems={multiSelectApiItems}
                    lookupFunction={fakeApiCall}
                    label="Select fruits"
                    debounceInMilliseconds={600}
                    placeholder="Search..."
                />
            </ComponentLabel>
            <ComponentLabel label="Single-Select Async">
                <SingleSelect
                    onUpdate={(item) => setSingleSelectApiItem(item)}
                    selectedItem={singleSelectApiItem}
                    lookupFunction={fakeApiCall}
                    label="Select a fruit"
                    debounceInMilliseconds={600}
                    placeholder="Search..."
                />
            </ComponentLabel>
            <ComponentLabel label="Single-Select">
                <SingleSelect
                    onUpdate={(item) => setSingleSelectItem(item)}
                    selectedItem={singleSelectItem}
                    items={fakeData}
                    label="Select a fruit"
                    debounceInMilliseconds={600}
                    placeholder="Search..."
                    required
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
