import { twMerge } from "tailwind-merge";

interface Props {
    children: React.ReactNode;
    label?: string;
    wrapperClassName?: string;
    labelClassName?: string;
    inputWrapperClassName?: string;
}

const LabelWrapper = ({
    children,
    label,
    wrapperClassName,
    labelClassName,
    inputWrapperClassName,
}: Props) => {
    return (
        <label
            className={twMerge(
                "inline-flex relative flex-col bg-white border border-slate-300 focus-within:border-blue-500 focus-within:outline focus-within:outline-slate-200 focus-within:outline-3 shadow rounded py-2 pl-2 pr-2 ",
                wrapperClassName
            )}
        >
            {label && (
                <div className={twMerge(labelClassName, "text-sm opacity-70")}>
                    {label}
                </div>
            )}
            <div className={inputWrapperClassName}>{children}</div>
        </label>
    );
};

export default LabelWrapper;
