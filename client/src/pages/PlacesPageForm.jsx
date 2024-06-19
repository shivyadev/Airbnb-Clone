import axios from "axios";
import Perks from "../components/Perks";
import { useEffect, useState } from "react";
import PhotosUploader from "../components/PhotosUploader";
import { Navigate, useParams } from "react-router-dom";
import AccountNav from "../components/AccountNav";

export default function PlacesPageForm() {
    const { id } = useParams();
    const [title, setTitle] = useState('');
    const [address, setAddress] = useState('');
    const [addedPhotos, setAddedPhotos] = useState([]);
    const [description, setDescription] = useState('');
    const [perks, setPerks] = useState([]);
    const [extraInfo, setExtraInfo] = useState('');
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [maxGuest, setMaxGuest] = useState('');
    const [price, setPrice] = useState(100);
    const [redirect, setRedirect] = useState(false);

    useEffect(() => {
        if (!id) return;

        axios.get('/places/' + id).then(({ data }) => {
            setTitle(data[0].title);
            setAddress(data[0].address);
            setAddedPhotos(data[0].addedPhotos);
            setDescription(data[0].description);
            setPerks(data[0].perks);
            setExtraInfo(data[0].extraInfo);
            setCheckIn(data[0].checkIn);
            setCheckOut(data[0].checkOut);
            setMaxGuest(data[0].maxGuest);
            setPrice(data[0].price);
        })

    }, [id])

    function inputHeader(text) {
        return <h2 className="text-xl mt-4">{text}</h2>
    }

    function inputDesc(text) {
        return <p className="text-gray-500 text-sm">{text}</p>
    }

    function preInput(header, desc) {
        return (
            <div>
                {inputHeader(header)}
                {inputDesc(desc)}
            </div>
        );
    }

    async function savePlace(ev) {
        ev.preventDefault();
        const placeInfo = {
            title, address, addedPhotos,
            description, perks, extraInfo,
            checkIn, checkOut, maxGuest, price
        };

        if (id) {
            //update place
            await axios.put('/places', { id, ...placeInfo });
        } else {
            //new place
            await axios.post('/places', placeInfo);
        }

        setRedirect(true);
    }

    if (redirect) {
        return <Navigate to={'/account/places'} />
    }

    return (

        <div>
            <AccountNav />
            <form onSubmit={savePlace}>
                {preInput('Title', 'Title of your place')}
                <input type="text"
                    value={title}
                    onChange={ev => setTitle(ev.target.value)}
                    placeholder="Title, for example: The massive mansion" />

                {preInput('Address', 'Address to the place')}
                <input type="text"
                    value={address}
                    onChange={ev => setAddress(ev.target.value)}
                    placeholder="Address" />

                {preInput('Photos', 'Photos of the premise')}
                <PhotosUploader addedPhotos={addedPhotos} setAddedPhotos={setAddedPhotos} />

                {preInput('Description', 'Add description of the place')}
                <textarea
                    value={description}
                    onChange={ev => setDescription(ev.target.value)} />

                {preInput('Perks', 'Select all the perks for your place')}
                {/* Add a proper pop window later */}
                <Perks selected={perks} onChange={setPerks} />

                {preInput('Extra Info', 'House rules, etc')}
                <textarea
                    value={extraInfo}
                    onChange={ev => setExtraInfo(ev.target.value)} />

                {preInput('Check In/Out Times', 'Add check in and check out times for your guest')}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-2">
                    <div>
                        <h3>Check in time</h3>
                        <input type="text"
                            value={checkIn}
                            onChange={ev => setCheckIn(ev.target.value)}
                            placeholder="2:00 PM" />
                    </div>
                    <div>
                        <h3>Check out time</h3>
                        <input type="text"
                            value={checkOut}
                            onChange={ev => setCheckOut(ev.target.value)}
                            placeholder="9:00 AM" />
                    </div>
                    <div>
                        <h3>Max Guests Allowed</h3>
                        <input type="number"
                            value={maxGuest}
                            onChange={ev => setMaxGuest(ev.target.value)}
                            placeholder="2" />
                    </div>
                    <div>
                        <h3>Price</h3>
                        <input type="number"
                            value={price}
                            onChange={ev => setPrice(ev.target.value)}
                            placeholder="" />
                    </div>
                </div>
                <div>
                    <button className="primary my-4">Save Details</button>
                </div>
            </form>
        </div>

    );

}