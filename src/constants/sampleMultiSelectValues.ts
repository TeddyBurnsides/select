import IIdName from "../types/IIdName";

export const fakeData: IIdName[] = [
    { id: 1, name: "Regular Apple" },
    { id: 7, name: "Red Delicious Apple" },
    { id: 8, name: "Granny Smith Apple" },
    { id: 4, name: "Banana" },
    { id: 5, name: "Peach" },
    { id: 2, name: "Plum" },
    { id: 3, name: "Pear" },
    { id: 6, name: "Sweet Plum" },
];

export const fakeApiCall = (stringToFilterOn: string): Promise<IIdName[]> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const filteredData = fakeData.filter(
                (x) =>
                    x.name
                        .toLowerCase()
                        .includes(stringToFilterOn.toLocaleLowerCase()) ||
                    x.id === Number(stringToFilterOn)
            );
            resolve(filteredData);
        }, 500);
    });
};
