import { Link } from "react-router-dom";

const Home = () => {
    const linkClasses =
        "text-2xl text-center text-blue-600 hover:text-blue-400 hover:underline focus:underline";
    return (
        <div className="max-w-xs mx-auto flex flex-col space-y-10 mt-10 ">
            <Link className={linkClasses} to="components/select">
                Select
            </Link>
            <Link className={linkClasses} to="components/color-picker">
                Color Picker
            </Link>
        </div>
    );
};

export default Home;
