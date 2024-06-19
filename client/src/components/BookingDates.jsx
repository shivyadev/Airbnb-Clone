import { differenceInCalendarDays, format } from "date-fns";
import Icons from "./Icons";

export default function BookingDates({ booking, className = '' }) {

    return (
        <div className={"flex gap-1" + className}>
            <Icons iconName={"night"} />
            {differenceInCalendarDays(new Date(booking.checkOut), new Date(booking.checkIn))} nights:
            <div className="flex gap-1 items-center ml-2">
                <Icons iconName={"calendar"} />
                {format(new Date(booking.checkIn), 'dd-MM-yyyy')}
            </div>
            &rarr;
            <div className="flex items-center gap-1">
                <Icons iconName={"calendar"} />
                {format(new Date(booking.checkOut), 'dd-MM-yyyy')}
            </div>
        </div>
    );

}