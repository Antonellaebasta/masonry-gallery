import { PageProps } from '@/.next/types/app/layout';

import { fetchData } from '../../utils';
import Photo from './photo';
import { BASE_URL } from '@/app/utils/constants';


const PhotoDetails = async ({ params }: PageProps) => {
  const { id } = await params;
  
  try {
    const photo = await fetchData(`${BASE_URL}photos/${id}`);

    return (
        <div>
        <h1>Photo Details</h1>
        <Photo {...photo} />
      </div>
    );
  } catch {
    return <h1>Something went wrong! Failed to fetch photo details.</h1>;
  }
};

export default PhotoDetails;
