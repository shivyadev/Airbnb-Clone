import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import Icons from "./Icons";

export default function AccountNav() {

    const { pathname } = useLocation();

    function linkClasses(type = null) {
        let classes = 'inline-flex py-2 px-6 gap-2 rounded-full';
        const subpage = pathname.split('/');
        const activePage = subpage.length < 3 ? 'profile' : subpage[2];
        if (type === activePage) {
            classes += ' bg-primary text-white'
        } else {
            classes += ' bg-gray-300';
        }

        return classes;
    }

    return (
        <nav className="w-full flex justify-center mt-8 mb-8 gap-2">
            <Link className={linkClasses('profile')} to={'/account'}>
                <Icons iconName={"profile"} />
                My Profile
            </Link>
            <Link className={linkClasses('bookings')} to={'/account/bookings'}>
                <Icons iconName={"list"} />
                My Bookings
            </Link>
            <Link className={linkClasses('places')} to={'/account/places'}>
                <Icons iconName={"home"} />
                My Accomodations
            </Link>
        </nav>
    );

}