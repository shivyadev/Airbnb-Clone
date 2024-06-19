import { Outlet, useLocation, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Header from "./Header";

export default function Layout() {

    const location = useLocation();
    const [pageTitle, setPageTitle] = useState('');
    const { id } = useParams();
    let styles;

    useEffect(() => {
        switch (location.pathname) {
            case `/place/${id}`:
                setPageTitle('PlaceInfoPage');
                break;
            default:
                setPageTitle('');
                break;
        }
    }, [location])

    if (pageTitle === 'PlaceInfoPage') {
        styles = "py-4 px-4 flex flex-col min-h-screen";
    } else {
        styles = "py-4 px-10 flex flex-col min-h-screen";
    }

    return (
        <div className={styles}>
            <Header pageName={pageTitle} />
            <Outlet />
        </div>
    );
}