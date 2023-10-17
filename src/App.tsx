import "./css/output.css";
import { createBrowserRouter } from "react-router-dom";
import { RouterProvider } from "react-router";
import Home from "./pages/Home";
import Select from "./pages/Select";
import ColorPickerExample from "./pages/ColorPicker";

const router = createBrowserRouter([
    {
        path: "/",
        Component: Home,
    },
    {
        path: "components",
        children: [
            {
                path: "select",
                element: <Select />,
            },
            {
                path: "color-picker",
                Component: ColorPickerExample,
            },
        ],
    },
]);

const App = () => {
    return <RouterProvider router={router} />;
};

export default App;
