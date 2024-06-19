export default function PlaceImg({ place, styles = null, index = 0 }) {

    if (!place.addedPhotos.length) {
        return '';
    }

    if (styles === null) {
        styles = 'object-cover w-full h-full';
    }

    if (place.addedPhotos[index].includes("https")) {
        return <img src={place.addedPhotos[index]} className={styles} />
    } else {
        return <img src={"http://localhost:4000/uploads/" + place.addedPhotos[index]} className={styles} />
    }

}