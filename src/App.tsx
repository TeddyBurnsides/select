import { useState } from "react";
import MultiSelect from "./components/select";
import IIdName from "./types/IIdName";
import "./css/output.css";
import Pill from "./components/pill";

const fakeData: IIdName[] = [
  { id: 1, name: "Option 1" },
  { id: 4, name: "Option 2" },
  { id: 5, name: "Testing" },
  { id: 2, name: "Testing 3" },
  { id: 3, name: "Testing 4" },
  { id: 6, name: "Pre selected item" },
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
    <div className="p-4">
      <h2 className="text-lg py-1">Possible Items for Selection</h2>
      <ul className="pb-2">
        {fakeData.map((x) => (
          <li className="ml-4 py-1 list-disc" key={x.id}>
            {x.name}
          </li>
        ))}
      </ul>
      <h2 className="text-lg py-1">Currently Selected Items</h2>
      <ul className="pb-2 flex gap-2 flex-wrap">
        {selectedItems.map((x) => (
          <Pill key={x.id} item={x} onDelete={removeItem} />
        ))}
      </ul>
      <div className="max-w-xs ">
        <MultiSelect
          onItemSelect={addItem}
          selectedItems={selectedItems}
          lookupFunction={fakeApiCall}
          label="Search"
          debounceInMilliseconds={200}
        />
      </div>
    </div>
  );
};

export default App;
