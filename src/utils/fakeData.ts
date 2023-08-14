import IIdName from "../types/IIdName";

export const fakeData: IIdName[] = [
	{ id: 1, name: "Apples" },
	{ id: 7, name: "Red Delicious Apples" },
	{ id: 8, name: "Granny Smith Apples" },
	{ id: 9, name: "Granny Apples" },
	{ id: 15, name: "Super nice Apples" },
	{ id: 11, name: "Just another Apples" },
	{ id: 12, name: "I hate Apples" },
	{
	  id: 10,
	  name: "What even more Apples? How is this even possible, more and more?",
	},
	{ id: 14, name: "yes that's right, we love Apples" },
	{ id: 13, name: "Dang Apples" },
	{ id: 4, name: "Bananas" },
	{ id: 5, name: "Peaches" },
	{ id: 2, name: "Plums" },
	{ id: 3, name: "Pears" },
	{ id: 6, name: "Sweet Plums" },
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
