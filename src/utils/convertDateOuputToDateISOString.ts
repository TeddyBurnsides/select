const convertDateOuputToDateISOString = (date?: string) => {
    if (!date) return undefined;
    return new Date(date).toISOString().split("T")[0];
};

export default convertDateOuputToDateISOString;
