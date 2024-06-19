import { useContext, useEffect, useState } from "react";
import { differenceInCalendarDays } from "date-fns";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { UserContext } from "../UserContext";

export default function BookingWidget({ place }) {

    const today = new Date().toISOString().split('T')[0];
    const [checkIn, setCheckIn] = useState(today);
    const [checkOut, setCheckOut] = useState('');
    const [numberOfGuest, setNumberOfGuest] = useState(1);
    const [name, setName] = useState('');
    const [mobile, setMobile] = useState('');
    const [redirect, setRedirect] = useState('');;
    const { user } = useContext(UserContext);
    let numberOfNights = 5;

    useEffect(() => {
        if (user) {
            setName(user.name);
        }
    }, [user])

    if (checkIn && checkOut) {
        numberOfNights = differenceInCalendarDays(new Date(checkOut), new Date(checkIn))
    }

    async function bookPlace() {
        const bookingInfo = {
            place: place._id, checkIn, checkOut,
            numberOfGuest, name, mobile,
            price: numberOfNights * place.price
        }

        const response = await axios.post('/bookings', bookingInfo);
        const bookingId = response.data._id;
        setRedirect(`/account/bookings/${bookingId}`);
    }

    if (redirect) return <Navigate to={redirect} />

    return (
        <div>
            <div id='fixedElement' className={"mb-2 bg-white p-5 rounded-2xl border-2 shadow-xl"}>
                <h2 className="ml-2 text-2xl font-semibold">
                    ${place.price} <span className="font-normal text-base">night</span>
                </h2>
                <div className="border rounded-2xl mt-4">
                    <div className="flex">
                        <div className="py-3 px-4">
                            <label>Check-in:</label>
                            <input type="date" value={checkIn} onChange={(ev) => setCheckIn(ev.target.value)} />
                        </div>
                        <div className="py-3 px-4 border-l">
                            <label>Check-out:</label>
                            <input type="date" value={checkOut} onChange={(ev) => setCheckOut(ev.target.value)} />
                        </div>
                    </div>
                    <div className="py-3 px-4 border-t">
                        <label>Number of guest:</label>
                        <input type="number" value={numberOfGuest} onChange={(ev) => setNumberOfGuest(ev.target.value)} />
                    </div>

                    {checkOut !== '' && (
                        <div className="py-3 px-4 border-t">
                            <label>Your full name:</label>
                            <input type="text" value={name} placeholder="John Doe" onChange={(ev) => setName(ev.target.value)} />
                            <label>Your number:</label>
                            <input type="tel" value={mobile} onChange={(ev) => setMobile(ev.target.value)} />
                        </div>
                    )}
                </div>
                <button onClick={bookPlace} className="primary mt-4">
                    Reserve
                </button>
                <div className="flex justify-between mx-3 mt-6 pb-3 border-b-1">
                    <span className="underline">${place.price} x {numberOfNights} nights</span>
                    <span>${place.price * numberOfNights}</span>
                </div>
                <div className="flex justify-between mx-3 mt-4">
                    <h2 className="text-lg font-semibold text-gray-700">Total before taxes</h2>
                    <span className="font-semibold">${place.price * numberOfNights}</span>
                </div>
            </div>
        </div >
    );

}