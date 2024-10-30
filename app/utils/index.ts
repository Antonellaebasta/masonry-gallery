const FIRST_PAGE_URL = 'https://api.pexels.com/v1/curated?page=1&per_page=20';

export const fetchPhotos = async (pageUrl = FIRST_PAGE_URL) => {
  try {
    const response = await fetch(pageUrl, {
      headers: {
        Authorization: `${process.env.PEXELS_API_KEY}`,
      },
    });
    const data = await response.json();

    return {
      photos: data.photos,
      nextPageUrl: data.next_page,
    };
  } catch (error) {
    throw error;
  }
};
