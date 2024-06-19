import { useEffect, useState } from "react";
import AccountNav from "../components/AccountNav";
import axios from "axios";
import PlaceImg from "../components/PlaceImg";
import { Link } from "react-router-dom";
import { format } from "date-fns";

export default function BookingPage() {
    const [bookings, setBookings] = useState([]);
    useEffect(() => {
        axios.get('/bookings').then(response => {
            setBookings(response.data);
        })
    }, [])

    return (
        <div>
            <AccountNav />
            <div className="justify-center mt-8 gap-6 gap-y-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {bookings?.length > 0 && bookings.map(booking => (
                    <Link to={`/account/bookings/${booking._id}`} className="bg-gray-200 p-2 rounded-2xl">
                        <div className="mb-2 bg-gray-500 rounded-2xl flex">
                            {booking.place.addedPhotos[0] && (
                                <PlaceImg styles={"rounded-t-2xl object-cover aspect-square"} place={booking.place} index={0} />
                            )}
                        </div>
                        <h3 className="text-md font-semibold text-gray-700 truncate">{booking.place.title}</h3>
                        <div className="text-sm text-gray-500 my-1">
                            <span>From {format(new Date(booking.checkIn), 'dd-MM-yyyy')}  </span>
                            <span>To {format(new Date(booking.checkOut), 'dd-MM-yyyy')}</span>
                        </div>
                        <div className="mt-1">
                            <span className="font-semibold text-gray-700">Total price: ${booking.price}</span>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}