'use client';

import { PhotoProps } from '@/app/types';
import Image from 'next/image';
import Link from 'next/link';
import styled from 'styled-components';

const Info = styled.div`
  font-size: 20px;
  width: 100%;
  text-align: center;
  padding: 12px 0;

  @media (max-width: 768px) {
    font-size: 18px;
  }
`;

const Description = styled.p`
  padding: 0 0 12px 0;
`;

const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  max-height: 800px;
  aspect-ratio: 16 / 9;

  @media (max-width: 1024px) {
    aspect-ratio: 4 / 5;
  }
`;

const Photo = ({
  alt,
  src,
  photographer,
  photographer_url,
}: PhotoProps) => (
  <>
    {(alt || photographer) && (
      <Info>
        {alt && <Description>{alt}</Description>}
        {photographer && <Link href={photographer_url}>© {photographer}</Link>}
      </Info>
    )}
    <ImageContainer>
      <Image
        src={src.large}
        alt={alt || 'Photo provided by Pexels'}
        style={{ objectFit: 'contain' }}
        fill
        loading='eager'
        priority
      />
    </ImageContainer>
  </>
);

export default Photo;
