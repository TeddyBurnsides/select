import { twMerge } from "tailwind-merge";
import LabelWrapper from "./LabelWrapper";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    wrapperClassName?: string;
    inputWrapperClassName?: string;
    labelClassName?: string;
}

const DateInput = ({
    label,
    wrapperClassName,
    inputWrapperClassName,
    labelClassName,
    ...htmlInputProps
}: Props) => {
    return (
        <LabelWrapper
            wrapperClassName={wrapperClassName + " min-w-40"}
            labelClassName={labelClassName + " flex"}
            inputWrapperClassName={inputWrapperClassName + " inline-flex"}
            label={label}
            required={htmlInputProps.required}
        >
            <input
                type={"date"}
                className={twMerge(
                    htmlInputProps.className,
                    "grow py-1 bg-transparent border-none focus:outline-none"
                )}
                {...htmlInputProps}
            />
        </LabelWrapper>
    );
};

export default DateInput;
