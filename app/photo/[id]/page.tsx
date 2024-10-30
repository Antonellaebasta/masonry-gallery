import { PageProps } from '@/.next/types/app/layout';

import { fetchData } from '../../utils';
import Photo from './photo';

const PhotoDetails = async ({ params }: PageProps) => {
  const { id } = await params;
  const photo = await fetchData(`https://api.pexels.com/v1/photos/${id}`);

  return (
    <div>
      <h1>Photo Details</h1>
      <Photo {...photo} />
    </div>
  );
};

export default PhotoDetails;
