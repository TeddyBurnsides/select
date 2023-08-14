import React, { useEffect, useRef, useState } from "react";
import IIdName from "../../types/IIdName";
import debounce from "../../utils/debounce";

enum Alerts {
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
  const [selectedItemsInternal, setSelectedItemsInternal] =
    useState<T[]>(selectedItems);
  const [alerts, setAlerts] = useState<Alerts>(Alerts.None);
  const [inputText, setInputText] = useState("");
  const [dropdownIsVisible, setDropdownIsVisible] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // lookup results with the provided looked function from props
  const lookupResults = (searchString: string, callback: () => void) => {
    if (searchString) {
      lookupFunction(searchString).then((apiResponse) => {
        // dopm't show selected results in list of searched-for items
        const filteredArray = apiResponse.filter((item1) =>
          selectedItemsInternal.every((item2) => item1.name !== item2.name)
        );
        setLookupFunctionResults(filteredArray);
        callback(); // reset loading state
        if (filteredArray.length === 0) {
          setAlerts(Alerts.NoResultsFound);
        } else {
          resetErrorState();
        }
      });
    } else {
      setLookupFunctionResults([]);
      resetErrorState();
    }
  };

  // select an item from the dropdown
  const handleSelect = (selectedItem: T) => {
    // remove selected item from dropdown list
    setLookupFunctionResults((prev) => {
      const filteredResults = prev?.filter((x) => x.id !== selectedItem.id);
      if (filteredResults.length === 0) {
        setAlerts(Alerts.NoResultsFound);
      }
      return filteredResults;
    });
    // call function to let parent component know
    onItemSelect(selectedItem);
    // highlight the text in the input
    inputRef.current?.select();
  };

  // update internal results list with the passed in prop
  useEffect(() => {
    setSelectedItemsInternal(selectedItems);
  }, [selectedItems]);

  // callback to reset loading state
  const resetErrorState = () => {
    setAlerts(Alerts.None);
  };

  const handleInputChange = debounce(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const searchString = e.target.value;
      setDropdownIsVisible(true);
      setAlerts(Alerts.Loading);
      setInputText(searchString); // used for form submit
      lookupResults(searchString, resetErrorState);
    },
    debounceInMilliseconds
  );

  const handleKeyDownOnInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      lookupResults(inputText, resetErrorState);
    } else if (e.key === "ArrowDown") {
      // put focus on the first item in the list if arrowing down from input
      const firstChild = dropdownRef.current?.firstChild as HTMLElement;
      if (firstChild) {
        firstChild.focus();
      }
    }
  };

  // allow for up/down arrow navigation on list items
  const handleKeyDownOnDropdownItem = (
    e: React.KeyboardEvent<HTMLButtonElement>
  ) => {
    if (e.key === "ArrowDown") {
      e.currentTarget.nextSibling &&
        (e.currentTarget.nextSibling as HTMLButtonElement).focus();
    }
    if (e.key === "ArrowUp") {
      e.currentTarget.previousSibling &&
        (e.currentTarget.previousSibling as HTMLButtonElement).focus();
    }
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setDropdownIsVisible(true);
    setAlerts(Alerts.Loading);
    lookupResults(inputText, resetErrorState);
  };

  // close dropdowns if user clicks outside select component
  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setDropdownIsVisible(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={containerRef}>
      {/* Input Element */}
      <form onSubmit={handleFormSubmit}>
        <label className="flex relative flex-col bg-white border border-slate-300 focus-within:border-blue-500 focus-within:outline  focus-within:outline-slate-200 focus-within:outline-3 shadow rounded py-2 pl-2 pr-10">
          {label && <div className="text-sm opacity-70">{label}</div>}
          <input
            ref={inputRef}
            className="py-1 bg-transparent border-none focus:outline-none"
            type="text"
            onChange={handleInputChange}
            {...htmlTextInputProps}
            onKeyDown={handleKeyDownOnInput}
          />
          <button
            type="submit"
            className="absolute bottom-2 right-2 hover:bg-slate-200 rounded px-1 text-lg"
          >
            &#x1F50E;
          </button>
        </label>
      </form>

      {/* Dropdown of search results */}
      {lookupFunctionResults &&
        lookupFunctionResults.length > 0 &&
        alerts !== Alerts.Loading &&
        dropdownIsVisible && (
          <div
            ref={dropdownRef}
            className={`max-h-64 overflow-y-scroll mt-1 py-1 bg-white shadow border border-slate-300 rounded absolute w-full`}
          >
            {lookupFunctionResults.map((x) => (
              <button
                key={x.id}
                className="leading-6 py-2 px-2 focus:bg-blue-500 focus:outline-none focus:text-white hover:bg-slate-200 w-full text-left"
                onClick={() => handleSelect(x)}
                onKeyDown={handleKeyDownOnDropdownItem}
              >
                {x.name}
              </button>
            ))}
          </div>
        )}

      {/* Messages */}
      {dropdownIsVisible &&
        (alerts === Alerts.NoResultsFound || alerts === Alerts.Loading) && (
          <div className="mt-1 py-3 text-slate-800 text-center italic bg-white shadow border border-slate-300 rounded absolute w-full">
            {alerts === Alerts.NoResultsFound &&
              "No results match search query"}
            {alerts === Alerts.Loading && "Loading..."}
          </div>
        )}
    </div>
  );
};

export default MultiSelect;
