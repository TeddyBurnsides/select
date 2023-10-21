interface Props {
    children: React.ReactNode;
    label: string;
}

const ComponentLabel = ({ children, label }: Props) => {
    return (
        <div className="flex">
            <div className="whitespace-nowrap basis-[16rem] opacity-70 text-right pr-10 text-sm uppercase font-semibold ">
                <div className="border-b border-black/20 pt-1 pb-2">
                    {label}
                </div>
            </div>
            <div className="shrink flex basis-[32rem] ">{children}</div>
        </div>
    );
};

export default ComponentLabel;
