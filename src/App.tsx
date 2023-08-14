import { useState } from "react";
import MultiSelect from "./components/select";
import IIdName from "./types/IIdName";
import "./css/output.css";
import Pill from "./components/pill";
import { fakeApiCall, fakeData } from "./utils/fakeData";

const App = () => {
  const [selectedItems, setSelectedItems] = useState<IIdName[]>([fakeData[5]]);

  const addItem = (newItem: IIdName) => {
    setSelectedItems((prev) => [...prev, newItem]);
  };

  const removeItem = (item: IIdName) => {
    setSelectedItems((prev) => [...prev.filter((x) => x.id !== item.id)]);
  };

  return (
    <div className="py-16 max-w-xs mx-auto">
      <h2 className="text-lg py-1">Fruits to choose from</h2>
      <p className="text-slate-700 leading-5 pb-4">
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
