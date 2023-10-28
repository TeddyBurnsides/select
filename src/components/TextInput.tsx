import { twMerge } from "tailwind-merge";
import LabelWrapper from "./LabelWrapper";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    wrapperClassName?: string;
    inputWrapperClassName?: string;
    labelClassName?: string;
}

const TextInput = ({
    label,
    wrapperClassName,
    inputWrapperClassName,
    labelClassName,
    ...htmlInputProps
}: Props) => {
    return (
        <LabelWrapper
            wrapperClassName={wrapperClassName + " grow"}
            labelClassName={labelClassName + " flex"}
            inputWrapperClassName={inputWrapperClassName}
            label={label}
            required={htmlInputProps.required}
        >
            <input
                type={htmlInputProps.type ?? "text"}
                className={twMerge(
                    htmlInputProps.className,
                    "py-1 bg-transparent border-none focus:outline-none"
                )}
                {...htmlInputProps}
            />
        </LabelWrapper>
    );
};

export default TextInput;
