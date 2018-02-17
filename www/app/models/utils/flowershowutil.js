export const fetchFlowerInfo = async (nowid) => {
    const { result } = await fetch(`/flowerinfo/${nowid}`).then(data => data.json());
    return result;
}

export const fetchFlowerLikes = async (nowid) => {
    const { results } = await fetch(`/flowerlikes/${nowid}`).then(data => data.json());
    return results;
}

export const fetchFlowerImages = async (nowid) => {
    const { images } = await fetch(`/flowerimages/${nowid}`).then(data => data.json());
    return images;
}