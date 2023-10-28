import React, { useEffect, useRef, useState } from "react";
import IIdName from "../types/IIdName";
import debounce from "../utils/debounce";
import LabelWrapper from "./LabelWrapper";
import Spinner from "./Spinner";

enum Alerts {
    None = 1,
    Loading = 2,
    NoResultsFound = 3,
}

interface Props<T> extends React.InputHTMLAttributes<HTMLInputElement> {
    selectedItem?: T;
    lookupFunction: (searchString: string) => Promise<T[]>;
    debounceInMilliseconds?: number;
    onItemSelect: (selectedItem: T) => void;
    onItemRemove: (item: IIdName) => void;
    label?: string;
    wrapperClassName?: string;
    labelClassName?: string;
    inputWrapperClassName?: string;
}

const SingleSelect = <T extends IIdName>({
    selectedItem,
    lookupFunction,
    debounceInMilliseconds = 300,
    label,
    onItemRemove,
    onItemSelect,
    wrapperClassName,
    labelClassName,
    inputWrapperClassName,
    ...htmlTextInputProps
}: Props<T>) => {
    const [lookupFunctionResults, setLookupFunctionResults] = useState<T[]>([]);
    const [selectedItemInternal, setSelectedItemInternal] = useState<
        T | undefined
    >(selectedItem);
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
                const filteredArray = apiResponse.filter(
                    (item) => selectedItemInternal?.name !== item.name
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
            const filteredResults = prev?.filter(
                (x) => x.id !== selectedItem.id
            );
            if (filteredResults.length === 0) {
                setAlerts(Alerts.NoResultsFound);
            }
            return filteredResults;
        });
        // call function to let parent component know
        onItemSelect(selectedItem);
        // highlight the text in the input
        inputRef.current?.select();

        setInputText(selectedItem.name);
    };

    // update internal results list with the passed in prop
    useEffect(() => {
        setSelectedItemInternal(selectedItem);
    }, [selectedItem]);

    // callback to reset loading state
    const resetErrorState = () => {
        setAlerts(Alerts.None);
    };

    const handleInputChange = debounce(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            const searchString = e.target.value;
            setDropdownIsVisible(true);
            setAlerts(Alerts.Loading);
            // setInputText(searchString); // used for form submit
            lookupResults(searchString, resetErrorState);
        },
        debounceInMilliseconds
    );

    const handleKeyDownOnInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            e.preventDefault();
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

    const handleFormSubmit = (
        e: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
        e.preventDefault();
        setDropdownIsVisible(true);
        setAlerts(Alerts.Loading);
        lookupResults(inputText, resetErrorState);
    };

    const clearInput = () => {
        setInputText("");
        setAlerts(Alerts.None);
        setDropdownIsVisible(false);
        setSelectedItemInternal(undefined);
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
        <div className="relative w-full" ref={containerRef}>
            {/* Input Element */}
            <form>
                <LabelWrapper
                    wrapperClassName={wrapperClassName + " flex"}
                    labelClassName={labelClassName + " flex"}
                    label={label}
                    inputWrapperClassName={"flex flex-col"}
                >
                    <div className="flex gap-1 pt-1">
                        <div className="h-5 w-5 mx-2">
                            {alerts === Alerts.Loading ? (
                                <Spinner className="h-full w-full mt-1" />
                            ) : (
                                <button
                                    type="button"
                                    onClick={handleFormSubmit}
                                    className="rounded text-lg"
                                >
                                    &#x1F50E;
                                </button>
                            )}
                        </div>
                        <input
                            ref={inputRef}
                            className="py-1 bg-transparent border-none focus:outline-none grow"
                            type="text"
                            value={inputText}
                            onChange={(e) => {
                                setInputText(e.target.value);
                                handleInputChange(e);
                            }}
                            {...htmlTextInputProps}
                            onKeyDown={handleKeyDownOnInput}
                        />

                        <button
                            type="button"
                            onClick={clearInput}
                            className="opacity-50 hover:opacity-100 text-xl px-2 rounded-full hover:bg-black/10"
                        >
                            &times;
                        </button>
                    </div>
                </LabelWrapper>
            </form>

            {/* Dropdown of search results */}
            {lookupFunctionResults &&
                lookupFunctionResults.length > 0 &&
                alerts !== Alerts.Loading &&
                dropdownIsVisible && (
                    <div
                        ref={dropdownRef}
                        className={`z-50 max-h-64 overflow-y-scroll mt-1 py-1 bg-white shadow border border-slate-300 rounded absolute w-full`}
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

            {/* No results found */}
            {dropdownIsVisible && alerts === Alerts.NoResultsFound && (
                <div className="z-50 mt-1 py-3 text-slate-800 text-center italic bg-white shadow border border-slate-300 rounded absolute w-full">
                    {"No results found for '" + inputText + "'"}
                </div>
            )}
        </div>
    );
};

export default SingleSelect;
