import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import BookingWidget from "../components/BookingWidget";
import PlaceGallery from "../components/PlaceGallery";
import AddressLink from "../components/AddressLink";
import Icons from "../components/Icons";
import { UserContext } from "../UserContext";
import PopUp from "../components/PopUp";

export default function PlaceInfoPage() {
    const { id } = useParams();
    const [place, setPlace] = useState(null);
    const [name, setName] = useState(null);
    const [showPopup, setShowPopup] = useState(false);
    const { user } = useContext(UserContext);
    const years = Math.floor(Math.random() * 3) + 3;
    const rating = ((Math.random() * 5) + 1).toPrecision(2);
    let styles = "mt-8 border-t-1 relative";

    useEffect(() => {
        if (!id) return;
        axios.get(`/places/${id}`).then(response => {
            const { data } = response;
            setPlace(data[0]);
            setName(data[1].name);
        })
    }, [id])

    if (!place) return '';

    if (showPopup) {
        styles += " overflow-hidden";
    }

    return (
        <div className="mt-8 border-t-1 relative">
            <div className={"mt-4 mx-28"}>
                <h1 className="text-3xl">{place.title}</h1>
                <AddressLink children={place.address} />
                <PlaceGallery place={place} />
                <div className={"mt-8 mb-8 grid grid-cols-1 md:grid-cols-[2fr_1fr]"}>
                    <div>
                        <div className="mb-4 mr-4 text-justify">
                            <h2 className="my-1 font-semibold text-2xl">Location in {place.address}</h2>
                            <span className="text-m text-gray-500">{place.maxGuest} Guest | 2 bedrooms | 2 beds | 2 bathrooms</span>
                        </div>
                        <div className="mt-8 gap-5 flex">
                            <div className="">
                                <Icons iconName={"userPhoto"} styles={"w-11 h-11 overflow-hidden"} />
                            </div>
                            <div>
                                <div className="font-semibold text-md">Hosted by {name}</div>
                                <div className="text-sm text-gray-500">{years} years hosting - {rating} rating</div>
                            </div>
                        </div>
                        <div className="mt-10 mr-20 border-t-1">
                            <div className="mt-6 mr-3 font-sans leading-1">{place.description}</div>
                        </div>
                        <div className="mt-4">
                            <span onClick={() => setShowPopup(true)} className="underline font-semibold mr-1 cursor-pointer">Show More</span>
                            <span className="text-md font-bold">{">"}</span>
                            <PopUp showPopUp={showPopup} setShowPopUp={setShowPopup} desc={place.description} extraInfo={place.extraInfo} />
                        </div>
                        <div className="border-t-1 mr-20 mt-10">
                            <h2 className="mt-4 mb-2 text-2xl font-semibold">What this place offers</h2>
                            <div id='scrollTrigger' className="grid sm:grid-cols-1 md:grid-cols-2 mr-32">
                                {place.perks.map(perk => (
                                    <div className="mt-6">
                                        <div className="flex gap-4">
                                            <Icons iconName={perk} styles={"w-7 h-7"} />
                                            <span className="text-lg font-light">{perk.charAt(0).toUpperCase() + perk.slice(1)}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <BookingWidget place={place} />
                </div>
            </div>
        </div>
    );
}