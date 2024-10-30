import { fetchData } from '../utils';
import PhotoGrid from './photo-grid';

const Photos = async () => {
  const { photos, next_page } = await fetchData('https://api.pexels.com/v1/curated?page=1&per_page=10');

  return (
    <div>
      <h1>Masonry Grid Layout</h1>
      <p>
        Photos provided by{' '}
        <a href="https://www.pexels.com" target="_">
          Pexels
        </a>
      </p>
      <PhotoGrid initialPhotos={photos} initialNextPageUrl={next_page} />
    </div>
  );
};

export default Photos;
