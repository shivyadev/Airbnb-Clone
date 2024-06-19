import Icons from "./Icons";

export default function Perks({ selected, onChange }) {

    function handleCbClick(ev) {

        const { checked, name } = ev.target;

        if (checked) {
            onChange([...selected, name]);
        } else {
            onChange([...selected.filter(selectedName => selectedName !== name)]);
        }
    }

    return (
        <div className="grid mt-2 grid-cols-2 md:grid-cols-4 lg-grid-cols-4 gap-2">
            <label className="border p-4 flex rounded-xl gap-2 cursor-pointer">
                <input type="checkbox" checked={selected.includes('wifi')} name="wifi" onChange={handleCbClick} className="mr-2" />
                <Icons iconName={"wifi"} />
                <span>
                    Wifi
                </span>
            </label>
            <label className="border p-4 flex rounded-xl gap-2 cursor-pointer">
                <input type="checkbox" checked={selected.includes('parking')} name="parking" onChange={handleCbClick} className="mr-2" />
                <Icons iconName={"parking"} />
                <span>
                    Free Parking Spot
                </span>
            </label>
            <label className="border p-4 flex rounded-xl gap-2 cursor-pointer">
                <input type="checkbox" checked={selected.includes('tv')} name="tv" onChange={handleCbClick} className="mr-2" />
                <Icons iconName={"tv"} />
                <span>
                    TV
                </span>
            </label>
            <label className="border p-4 flex rounded-xl gap-2 cursor-pointer">
                <input type="checkbox" checked={selected.includes('radio')} name="radio" onChange={handleCbClick} className="mr-2" />
                <Icons iconName={"radio"} />
                <span>
                    Radio
                </span>
            </label>
            <label className="border p-4 flex rounded-xl gap-2 cursor-pointer">
                <input type="checkbox" checked={selected.includes('pets')} name="pets" onChange={handleCbClick} className="mr-2" />
                <Icons iconName={"pets"} />
                <span>
                    Pets
                </span>
            </label>
            <label className="flex border p-4 rounded-xl gap-2 cursor-pointer">
                <input type="checkbox" checked={selected.includes('entrance')} name="entrance" onChange={handleCbClick} className="mr-2" />
                <Icons iconName={"entrance"} />
                <span>
                    Private entrance
                </span>
            </label>
        </div>
    );
}