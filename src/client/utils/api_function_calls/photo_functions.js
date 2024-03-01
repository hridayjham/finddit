import axios from "axios";
const PHOTO_URL = "https://maps.googleapis.com/maps/api/place/photo";
const API_KEY = process.env.GCP_KEY;

async function getEmbedUrlFromPhotoRef(ref, maxwidth) {
    const res = await axios.get(
        `${PHOTO_URL}?maxwidth=${maxwidth}&photo_reference=${ref}&key=`
    );
    return res.request.responseURL;
}

module.exports = { getEmbedUrlFromPhotoRef };
