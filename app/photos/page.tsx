import { fetchPhotos } from '../utils';
import PhotoGrid from './photo-grid';

const Overview = async () => {
  const { photos, nextPageUrl } = await fetchPhotos();

  return (
    <div>
      <h1>Masonry Grid Layout</h1>
      <p>
        Photos provided by{' '}
        <a href="https://www.pexels.com" target="_">
          Pexels
        </a>
      </p>
      <PhotoGrid initialPhotos={photos} initialNextPageUrl={nextPageUrl} />
    </div>
  );
};

export default Overview;
