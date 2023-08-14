# Multi-Select React Component ([Live Demo](https://select-omega.vercel.app/))

- Supports loading data from arbitrary API call (faked in demo with a setTimeout() function)
- Select component itself is ~200 lines long and relies heavily on native focus
- Selectable items can be an array of anything that extends { id: number, name: string }
- Selected item state can be managed by a parent component

A simple Pill component has been created alongside this to demostrate how the selected items might be managed by the parent component. 

## Dependencies

- React
- TypeScript
- Tailwind CSS
