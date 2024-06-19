import { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "./UserContext";
import Icons from "./components/Icons";

export default function Header({ pageName }) {

    const { user } = useContext(UserContext);
    let styles = '';

    if (pageName === "PlaceInfoPage") {
        styles = "mx-28 flex justify-between items-center";
    } else {
        styles = "flex justify-between items-center";
    }

    return (
        <header className={styles}>
            <Link to="/" className="flex items-center gap-1">
                <Icons iconName={"logo"} styles={"w-8 h-8 -rotate-90 text-primary"} />
                <span className='font-bold text-xl text-primary'>airbnb</span>
            </Link>
            <div className="flex gap-2 border border-gray-300 font-semibold rounded-full py-2 px-4 shadow-md shadow-gray-300">
                <div>Anywhere</div>
                <div className="border-l border-gray-300"></div>
                <div>Any week</div>
                <div className="border-l border-gray-300"></div>
                <div>Add guests</div>
                <button className='bg-primary text-white p-1.5 rounded-full '>
                    <Icons iconName={"search"} styles={"w-4 h-4"} />
                </button>
            </div>
            <Link to={user ? '/account' : '/login'} className="flex gap-2 border border-gray-300 font-bold rounded-full py-2 px-4">
                <Icons iconName={"profilePhoto"} />
                <div className="bg-gray-500 text-white rounded-full border border-gray-500">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 relative top-1 overflow-hidden">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                    </svg>
                </div>
                {!!user && (
                    <div>
                        {user.name}
                    </div>
                )}
            </Link>
        </header>
    );
}