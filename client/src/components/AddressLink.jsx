import Icons from "./Icons";

export default function AddressLink({ children, className = null }) {

    if (!className) {
        className = "flex gap-1 my-3 block";
    }
    className += ' flex gap-1 font-semibold underline'
    return (
        <a className={className} href={'http://maps.google.com/?q=' + children}>
            <Icons iconName={"location"} />
            {children}
        </a>
    );

}