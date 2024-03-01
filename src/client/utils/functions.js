import { getEmbedUrlFromPhotoRef } from "./api_function_calls/photo_functions";

export const fetchImageUrl = async (cardData) => {
    const cards = [];

    const promises = cardData.data.map(async (item) => {
        try {
            let ref = item.photos[0].photo_reference;
            let imageUrl = await getEmbedUrlFromPhotoRef(ref, 1000);
            let card = {
                ...item,
                image: imageUrl,
            };
            cards.push(card);
        } catch (error) {
            // Handle errors if necessary
            console.error(`Error processing item: ${error.message}`);
        }
    });

    await Promise.all(promises);

    return cards;
};
