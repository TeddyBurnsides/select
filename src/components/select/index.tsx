import { useEffect, useRef, useState } from "react";
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
  label: string;
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
  const [isVisible, setIsVisible] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

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

    inputRef.current?.select();
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
    setIsVisible(true);
    setState(ErrorState.Loading);
    setInputText(searchString); // used for form submit
    lookupResults(searchString, resetErrorState);
  }, debounceInMilliseconds);

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsVisible(true);
    setState(ErrorState.Loading);
    lookupResults(inputText, resetErrorState);
  };

  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Attach event listener to detect clicks outside the div
    const handleClickOutside = (event: any) => {
      if (divRef.current && !divRef.current.contains(event.target)) {
        setIsVisible(false);
      }
    };

    // Add event listener
    document.addEventListener("mousedown", handleClickOutside);

    // Clean up event listener on unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={divRef}>
      {/* Input Element */}
      <form onSubmit={handleFormSubmit}>
        <label className="flex relative flex-col bg-white border border-slate-300 focus-within:border-blue-500 focus-within:outline  focus-within:outline-slate-200 focus-within:outline-3 shadow rounded pt-1 pb-2 pl-2 pr-10">
          <div className="text-sm py-1 opacity-70">{label}</div>{" "}
          <input
            ref={inputRef}
            className="py-1 bg-transparent border-none focus:outline-none"
            type="text"
            onChange={(e) => handleInputChange(e.target.value)}
            {...htmlTextInputProps}
          />
          <button
            type="submit"
            className="absolute bottom-1 right-2 hover:bg-slate-200 rounded px-1 text-lg"
          >
            &#x1F50E;
          </button>
        </label>
      </form>

      {/* Dropdown of search results */}
      {lookupFunctionResults &&
        lookupFunctionResults.length > 0 &&
        state !== ErrorState.Loading &&
        isVisible && (
          <ul
            className={`mt-1 py-1 bg-white shadow border border-slate-300 rounded absolute w-full`}
          >
            {lookupFunctionResults.map((x) => (
              <li key={x.id}>
                <button
                  className="py-3 px-2 focus:bg-blue-500 focus:outline-none focus:text-white hover:bg-slate-200 w-full text-left"
                  onClick={() => handleSelect(x)}
                >
                  {x.name}
                </button>
              </li>
            ))}
          </ul>
        )}

      {/* Messages */}
      {isVisible &&
        (state === ErrorState.NoResultsFound ||
          state === ErrorState.Loading) && (
          <div className="mt-1 py-3 text-slate-800 text-center italic bg-white shadow border border-slate-300 rounded absolute w-full">
            {state === ErrorState.NoResultsFound &&
              "No results match search query"}
            {state === ErrorState.Loading && "Loading..."}
          </div>
        )}
    </div>
  );
};

export default MultiSelect;
