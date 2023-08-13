import { useState } from "react";
import MultiSelect from "./components/select";
import IIdName from "./types/IIdName";

const fakeData: IIdName[] = [
  { id: 1, name: "Option 1" },
  { id: 4, name: "Option 2" },
  { id: 5, name: "Testing" },
  { id: 2, name: "Testing 3" },
  { id: 3, name: "Testing 4" },
  { id: 6, name: "Pre selected item" },
];

const App = () => {
  const [items, setItems] = useState<IIdName[]>([fakeData[5]]);

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

  const addItemToList = (newItem: IIdName) => {
    setItems((prev) => [...prev, newItem]);
  };

  return (
    <div>
      <ul>
        {items.map((x) => (
          <li key={x.id}>{x.name}</li>
        ))}
      </ul>
      <MultiSelect
        onItemSelect={addItemToList}
        selectedItems={items}
        lookupFunction={fakeApiCall}
        label="Search for things"
        debounceInMilliseconds={200}
      />
    </div>
  );
};

export default App;
