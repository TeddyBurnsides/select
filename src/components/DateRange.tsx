import { useState } from "react";
import TextInput from "./TextInput";
import convertDateOuputToDateISOString from "../utils/convertDateOuputToDateISOString";
import LabelWrapper from "./LabelWrapper";

interface Props {
    defaultStartDate?: string;
    defaultEndDate?: string;
    onChange?: (startDate?: string, endDate?: string) => void;
}
const DateRange = ({ onChange, defaultStartDate, defaultEndDate }: Props) => {
    const [start, setStart] = useState<string>();
    const [end, setEnd] = useState<string>();
    return (
        <LabelWrapper
            wrapperClassName="py-0 "
            inputWrapperClassName={"flex flex-row"}
        >
            <TextInput
                label="Start Date"
                type="date"
                defaultValue={defaultStartDate}
                onChange={(e) => {
                    setStart(e.target.value);
                    if (onChange) onChange(e.target.value, end);
                }}
                wrapperClassName="focus-within:outline-0 border-0 shadow-none rounded-none px-0 grow"
                max={convertDateOuputToDateISOString(end)}
            />
            <TextInput
                label="End Date"
                type="date"
                defaultValue={defaultEndDate}
                min={convertDateOuputToDateISOString(start)}
                onChange={(e) => {
                    setEnd(e.target.value);
                    if (onChange) onChange(start, e.target.value);
                }}
                wrapperClassName="focus-within:outline-0 border-0 border-l shadow-none rounded-none pl-3 pr-0 grow"
            />
        </LabelWrapper>
    );
};

export default DateRange;