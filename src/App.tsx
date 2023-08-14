import { useState } from "react";
import MultiSelect from "./components/select";
import IIdName from "./types/IIdName";
import "./css/output.css";
import Pill from "./components/pill";

const fakeData: IIdName[] = [
  { id: 1, name: "Apples" },
  { id: 7, name: "Red Delicious Apples" },
  { id: 8, name: "Granny Smith Apples" },
  { id: 9, name: "Granny Apples" },
  { id: 10, name: "Super nice Apples" },
  { id: 11, name: "Just another Apples" },
  { id: 12, name: "I hate Apples" },
  { id: 4, name: "Bananas" },
  { id: 5, name: "Peaches" },
  { id: 2, name: "Plums" },
  { id: 3, name: "Pears" },
  { id: 6, name: "Sweet Plums" },
];

const App = () => {
  const [selectedItems, setSelectedItems] = useState<IIdName[]>([fakeData[5]]);

  const fakeApiCall = (stringToFilterOn: string): Promise<IIdName[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const filteredData = fakeData.filter((x) =>
          x.name.toLowerCase().includes(stringToFilterOn.toLocaleLowerCase())
        );
        resolve(filteredData);
      }, 500);
    });
  };

  const addItem = (newItem: IIdName) => {
    setSelectedItems((prev) => [...prev, newItem]);
  };

  const removeItem = (item: IIdName) => {
    setSelectedItems((prev) => [...prev.filter((x) => x.id !== item.id)]);
  };

  return (
    <div className="pt-16 max-w-xs mx-auto">
      <h2 className="text-lg py-1">Possible Items for Selection</h2>
      <p className="text-slate-700 leading-5">
        {fakeData.map((x) => x.name).join(", ")}
      </p>
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
  );
};

export default App;
