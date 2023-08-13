import { useEffect, useState } from "react";
import IIdName from "../../types/IIdName";
import debounce from "../../utils/debounce";

enum ErrorState {
  None = 1,
  Loading = 2,
  NoResultsFound = 3,
}

interface Props<T> extends React.InputHTMLAttributes<HTMLInputElement> {
  selectedItems?: T[];
  lookupFunction: (searchString: string) => Promise<T[]>;
  debounceInMilliseconds?: number;
  onItemSelect: (selectedItem: T) => void;
  label?: string;
}

const MultiSelect = <T extends IIdName>({
  selectedItems = [],
  lookupFunction,
  debounceInMilliseconds = 300,
  label,
  onItemSelect,
  ...htmlTextInputProps
}: Props<T>) => {
  const [lookupFunctionResults, setLookupFunctionResults] = useState<T[]>([]);
  const [selectedResults, setSelectedResults] = useState<T[]>(selectedItems);
  const [state, setState] = useState<ErrorState>(ErrorState.None);
  const [inputText, setInputText] = useState("");

  // lookup results with the provided looked function from props
  const lookupResults = (searchString: string, callback: () => void) => {
    if (searchString) {
      lookupFunction(searchString).then((apiResponse) => {
        const filteredArray = apiResponse.filter((item1) =>
          selectedResults.every((item2) => item1.name !== item2.name)
        );
        setLookupFunctionResults(filteredArray);
        callback(); // reset loading state
        if (filteredArray.length === 0) {
          setState(ErrorState.NoResultsFound);
        } else {
          resetErrorState();
        }
      });
    } else {
      setLookupFunctionResults([]);
      resetErrorState();
    }
  };

  // called when an item is selected
  const handleSelect = (selectedItem: T) => {
    //setSelectedResults((prev) => [...prev, selectedItem]);
    setLookupFunctionResults((prev) => {
      const filteredResults = prev?.filter((x) => x.id !== selectedItem.id);
      if (filteredResults.length === 0) {
        setState(ErrorState.NoResultsFound);
      }
      return filteredResults;
    });
    onItemSelect(selectedItem);
  };

  // update internal results list with the passed in prop
  useEffect(() => {
    setSelectedResults(selectedItems);
  }, [selectedItems]);

  // callback to reset loading state
  const resetErrorState = () => {
    setState(ErrorState.None);
  };

  const handleInputChange = debounce((searchString: string) => {
    setState(ErrorState.Loading);
    setInputText(searchString); // used for form submit
    lookupResults(searchString, resetErrorState);
  }, debounceInMilliseconds);

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setState(ErrorState.Loading);
    lookupResults(inputText, resetErrorState);
  };

  const handleFormClear = () => {
    setLookupFunctionResults([]);
  };

  return (
    <>
      <form onSubmit={handleFormSubmit}>
        {label && (
          <div>
            <label>{label}</label>
          </div>
        )}
        <input
          type="text"
          onChange={(e) => handleInputChange(e.target.value)}
          {...htmlTextInputProps}
        />
        <button type="reset" onClick={handleFormClear}>
          Clear
        </button>
        <button type="submit">Search</button>
        {state === ErrorState.Loading && "Loading..."}
      </form>
      <ul>
        {lookupFunctionResults?.map((x) => (
          <li key={x.id}>
            <button onClick={() => handleSelect(x)}>{x.name}</button>
          </li>
        ))}
      </ul>
      <div>{state === ErrorState.NoResultsFound && "No Results Found"}</div>
    </>
  );
};

export default MultiSelect;
