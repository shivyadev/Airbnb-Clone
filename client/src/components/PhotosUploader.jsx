import { useState } from "react";
import axios from "axios";
import Icons from "./Icons";

export default function PhotosUploader({ addedPhotos, setAddedPhotos }) {

    const [photoLink, setPhotoLink] = useState('');

    async function addPhotoByLink(ev) {
        ev.preventDefault();
        setAddedPhotos(prev => {
            return [...prev, photoLink];
        })
        setPhotoLink('');
    }

    async function uploadPhoto(ev) {
        const files = ev.target.files;
        const data = new FormData();
        for (let i = 0; i < files.length; i++) {
            data.append('photos', files[i]);
        }

        const { data: filenames } = await axios.post('/upload', data, {
            headers: { 'Content-type': 'multipart/form-data' }
        })

        for (let i = 0; i < filenames.length; i++) {
            filenames[0] = 'http://localhost:4000/uploads/' + filenames[0];
        }

        setAddedPhotos(prev => {
            return [...prev, ...filenames]
        })
    }

    function removePhoto(ev, link) {
        ev.preventDefault();
        setAddedPhotos([...addedPhotos.filter(photo => photo !== link)])
    }

    function setMainPhoto(ev, link) {
        ev.preventDefault();
        setAddedPhotos((prev) => {
            let updatedPhotos = [...addedPhotos.filter(photo => photo !== link)];
            return [link, ...updatedPhotos];
        })
    }

    return (
        <>
            <div className="flex gap-2">
                <input type="text"
                    value={photoLink}
                    onChange={ev => setPhotoLink(ev.target.value)}
                    placeholder="Add image link" />
                <button onClick={addPhotoByLink} className="bg-gray-200 rounded-2xl px-3" >Add&nbsp;Photo</button>
            </div>
            <div className="mt-2 gap-2 grid grid-cols-3 md:grid-cols-4 lg:grid-cols-7">
                {addedPhotos.length > 0 && addedPhotos.map(link => (
                    <div className="h-32 flex relative" key={link}>
                        <img className="rounded-2xl w-full object-cover" src={link} />
                        <button onClick={(ev) => setMainPhoto(ev, link)} className="absolute bottom-1 left-1 text-white bg-black bg-opacity-50 p-2 rounded-2xl">
                            {link !== addedPhotos[0] && (
                                <Icons iconName={"filledStar"} styles={"w-5 h-5"} />
                            )}
                            {link === addedPhotos[0] && (
                                <Icons iconName={"star"} styles={"w-5 h-5"} />
                            )}
                        </button>
                        <button onClick={(ev) => removePhoto(ev, link)} className="absolute bottom-1 right-1 text-white bg-black bg-opacity-50 p-2 rounded-2xl">
                            <Icons iconName={"bin"} styles={"w-5 h-5"} />
                        </button>
                    </div>
                ))}
                <label className="h-32 flex cursor-pointer items-center justify-center gap-1 border bg-transparent rounded-2xl p-2 text-xl">
                    <input type="file" multiple className="hidden" onChange={uploadPhoto} />
                    <Icons iconName={"upload"} styles={"w-7 h-7"} />
                    Upload
                </label>
            </div>
        </>
    );

}