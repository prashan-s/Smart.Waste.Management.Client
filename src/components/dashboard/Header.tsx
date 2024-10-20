type HeaderProps = {
    title: string;
};

const Header = ({ title }: HeaderProps) => {
    return (
        <header className="flex w-full items-center justify-between pb-4">
            <h1 className="text-4xl font-semibold italic text-black">{title}</h1>
        </header>
    );
};

export default Header;  