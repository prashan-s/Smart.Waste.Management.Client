import { PulseLoader } from "react-spinners"

interface LoaderProps {
    loading: boolean;
}

const Loader: React.FC<LoaderProps> = ({ loading }) => {

    if (!loading) return null;

    return (
        <div className="fixed inset-0 w-full h-full z-50 bg-white bg-opacity-80 flex justify-center items-center">
            <PulseLoader
                color="#56D76B"
                cssOverride={{}}
                loading
                margin={2}
                size={10}
            />
        </div>
    );
};

export default Loader;