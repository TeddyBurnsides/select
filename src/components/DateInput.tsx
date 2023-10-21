import { twMerge } from "tailwind-merge";
import TextInput from "./TextInput";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    wrapperClassName?: string;
    labelClassName?: string;
}

const DateInput = ({
    label,
    wrapperClassName,
    labelClassName,
    ...htmlInputProps
}: Props) => {
    return (
        <TextInput
            label={label}
            wrapperClassName={twMerge(wrapperClassName, "min-w-36")}
            labelClassName={labelClassName}
            type="date"
            {...htmlInputProps}
        />
    );
};

export default DateInput;
