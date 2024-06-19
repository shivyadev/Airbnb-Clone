import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import AccountNav from "../components/AccountNav";
import axios from "axios";
import PlaceImg from "../components/PlaceImg";
import Icons from "../components/Icons";

export default function PlacesPage() {
    const [places, setPlaces] = useState([]);
    useEffect(() => {
        axios.get('/user-places').then(({ data }) => {
            setPlaces(data);
        })
    }, [])

    return (
        <div>
            <AccountNav />
            <div className="text-center">
                <Link to={'/account/places/new'} className="inline-flex bg-primary text-white py-2 px-6 rounded-full gap-2">
                    <Icons iconName={"plus"} />
                    Add New Place
                </Link>
            </div>
            <div className="mt-4">
                {places.length > 0 && places.map(place => (
                    <Link to={'/account/places/' + place._id} className="mt-2 flex gap-4 bg-gray-200 p-4 rounded-2xl">
                        <div className="flex w-32 h-32 bg-gray-300 rounded-2xl grow shrink-0">
                            <PlaceImg place={place} styles={"object-cover rounded-2xl w-full h-full"} />
                        </div>
                        <div className="grow-0 shrink">
                            <h2 className="text-xl">{place.title}</h2>
                            <p className="text-sm mt-2 text-justify">{place.description}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );

}