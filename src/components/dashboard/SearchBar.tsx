import { FiSearch } from "react-icons/fi";

const SearchBar = () => {
    return (
        <div className="relative w-1/3">
            <input
                type="text"
                placeholder="Search..."
                className="w-full px-4 py-2 border border-solid border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <FiSearch className="absolute right-4 top-3 text-gray-500" />
        </div>
    );
};

export default SearchBar;