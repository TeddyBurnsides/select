import { useState } from "react";
import convertDateOuputToDateISOString from "../utils/convertDateOuputToDateISOString";
import LabelWrapper from "./LabelWrapper";
import DateInput from "./DateInput";

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
            inputWrapperClassName={"inline-flex flex-row"}
        >
            <DateInput
                label="Start Date"
                type="date"
                defaultValue={defaultStartDate}
                onChange={(e) => {
                    setStart(e.target.value);
                    if (onChange) onChange(e.target.value, end);
                }}
                wrapperClassName="focus-within:outline-0 border-0 shadow-none rounded-none pl-0 pr-3"
                max={convertDateOuputToDateISOString(end)}
            />
            <DateInput
                label="End Date"
                type="date"
                defaultValue={defaultEndDate}
                min={convertDateOuputToDateISOString(start)}
                onChange={(e) => {
                    setEnd(e.target.value);
                    if (onChange) onChange(start, e.target.value);
                }}
                wrapperClassName="focus-within:outline-0 border-0 border-l shadow-none rounded-none pl-3 pr-0"
            />
        </LabelWrapper>
    );
};

export default DateRange;
