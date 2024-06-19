import axios from "axios"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import PlaceImg from "../components/PlaceImg";
import ReactPaginate from "react-paginate";
import Icons from "../components/Icons";

function RandomisePlace(placesData) {

    const hasOccured = [];
    const randomisedPlaces = [];

    while (randomisedPlaces.length < placesData.length) {
        const idx = Math.floor(Math.random() * placesData.length);
        if (!hasOccured.includes(idx)) {
            randomisedPlaces.push(placesData[idx]);
            hasOccured.push(idx);
        }
    }
    return randomisedPlaces;
}

export default function Home() {
    const [places, setPlaces] = useState([]);
    const [pageNumber, setPageNumber] = useState(0);

    useEffect(() => {
        axios.get('/places').then(response => {
            setPlaces(RandomisePlace(response.data));
        })
    }, [])

    const placePerPage = 12;
    const pagesVisited = pageNumber * placePerPage;
    const placesToDisplay = places.slice(pagesVisited, pagesVisited + placePerPage);
    const pageCount = Math.ceil(places.length / placePerPage);

    function changePage({ selected }) {
        setPageNumber(selected);
    }

    return (
        <div>
            <div className="justify-center mt-8 gap-6 gap-y-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {placesToDisplay.length > 0 && placesToDisplay.map(place => (
                    <Link to={'/place/' + place._id}>
                        <div className="mb-2 bg-gray-500 rounded-2xl flex">
                            {place.addedPhotos[0] && (
                                <PlaceImg styles={"rounded-2xl object-cover aspect-square"} place={place} index={0} />
                            )}
                        </div>
                        <h2 className="font-bold truncate">{place.address}</h2>
                        <h3 className="text-sm text-gray-500 truncate">{place.title}</h3>
                        <div className="mt-1">
                            <span className="font-bold">${place.price}</span> per night
                        </div>
                    </Link>
                ))}
            </div>
            {places.length > 0 && (
                <div className="flex mt-10 justify-center w-full">
                    <ReactPaginate
                        previousLabel={
                            <div className="flex">
                                <Icons iconName={"prev"} styles="w-6 h-6 mr-2" />
                                Previous
                            </div>
                        }
                        nextLabel={
                            <div className="flex">
                                Next
                                <Icons iconName={"next"} styles="w-6 h-6 ml-2" />
                            </div>
                        }
                        pageCount={pageCount}
                        onPageChange={changePage}
                        containerClassName={"paginationBttns"}
                        previousLinkClassName={"previousBttns"}
                        pageLinkClassName={"pageBttns"}
                        nextLinkClassName={"nextBttns"}
                        breakLinkClassName={"break"}
                        disabledClassName={"paginationDisabled"}
                        activeClassName={"activeBttn"}
                    />
                </div>
            )}
        </div>
    )
}