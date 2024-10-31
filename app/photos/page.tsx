import { fetchData } from '../utils';
import { FIRST_PAGE_URL } from '../utils/constants';
import PhotoGrid from './photo-grid';

const Photos = async () => {
  try {
    const { photos, next_page } = await fetchData(FIRST_PAGE_URL);

    return (
      <div>
        <h1>Masonry Grid Layout</h1>
        <p>
          Photos provided by{' '}
          <a href='https://www.pexels.com' target='_blank'>
            Pexels
          </a>
        </p>
        <PhotoGrid initialPhotos={photos} initialNextPageUrl={next_page} />
      </div>
    );
  } catch {
    return (
      <h1>Something went wrong! Failed to fetch photos.</h1>
    );
  }
};

export default Photos;
