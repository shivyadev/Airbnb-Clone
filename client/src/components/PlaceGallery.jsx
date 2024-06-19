import { useState } from "react";
import Icons from "./Icons";

export default function PlaceGallery({ place }) {

    const [showAllPhotos, setShowAllPhotos] = useState(false);
    const [index, setIndex] = useState(0);
    let photo = place.addedPhotos[index];

    function changePhotoPrev() {
        if (index == 0) {
            setIndex(place.addedPhotos.length - 1);
        } else {
            let newIndex = index - 1;
            setIndex(newIndex);
        }
    }

    function changePhotoNext() {
        if (index == place.addedPhotos.length - 1) {
            setIndex(0);
        } else {
            let newIndex = index + 1;
            setIndex(newIndex);
        }
    }

    if (showAllPhotos) {
        return (
            <div id="photoGallery" className="fixed top-0 left-0 bg-black text-white w-full h-full">
                <div className="flex justify-center items-center w-full h-full">
                    <button onClick={() => { setShowAllPhotos(false) }} className="fixed right-12 top-6 flex gap-1 py-2 px-4 rounded-2xl shadow shadow-black text-black">
                        <Icons iconName={"cross"} />
                        Close photos
                    </button>
                    <button onClick={changePhotoPrev} className="fixed top-50 left-10 bg-white opacity-75 text-black p-2 rounded-full hover:opacity-100 transition-all">
                        <Icons iconName={"prev"} styles="w-8 h-8" />
                    </button>
                    <div className="max-w-md max-h-md">
                        <img src={photo} />
                    </div>
                    <button onClick={changePhotoNext} className="fixed top-50 right-10 bg-white opacity-75 text-black p-2 rounded-full hover:opacity-100 transition-all">
                        <Icons iconName={"next"} styles="w-8 h-8" />
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="relative">
            <div className="gap-2 grid grid-cols-[2fr_1fr] rounded-3xl overflow-hidden">
                <div>
                    {place.addedPhotos?.[0] && (
                        <div>
                            <img onClick={() => setShowAllPhotos(true)} className="cursor-pointer aspect-square object-cover w-full h-full" src={place.addedPhotos[0]} />
                        </div>
                    )}
                </div>
                <div className="grid">
                    {place.addedPhotos?.[1] && (
                        <img onClick={() => setShowAllPhotos(true)} className="cursor-pointer object-cover aspect-square" src={place.addedPhotos[1]} />
                    )}
                    <div className="overflow-hidden">
                        {place.addedPhotos?.[2] && (
                            <img onClick={() => setShowAllPhotos(true)} className="cursor-pointer object-cover aspect-square relative top-2" src={place.addedPhotos[2]} />
                        )}
                    </div>
                </div>
            </div>
            <button onClick={() => setShowAllPhotos(true)} className="flex gap-1 absolute bottom-2 right-2 py-2 px-4 bg-white rounded-2xl shadow-lg shadow-gray-500">
                <Icons iconName={"album"} />
                Show more photos
            </button>
        </div>
    );

}