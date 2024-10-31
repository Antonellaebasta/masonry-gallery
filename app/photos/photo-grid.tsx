'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState, useRef, useCallback } from 'react';
import styled from 'styled-components';

import { fetchData } from '../utils';
import { PhotoProps, PhotoGridProps } from '../types';
import ErrorMessage from '../components/error-message';

const INTERSECTION_OBSERVER_OPTIONS = {
  root: null,
  rootMargin: '0px',
  threshold: 0.5,
};
const EAGER_LOAD_THRESHOLD = 10;

const Grid = styled.div`
  column-count: 4;
  column-gap: 20px;
  margin: 16px;
  content-visibility: auto;
  contain-intrinsic-size: 3 / 2;

  @media (max-width: 1024px) {
    column-count: 3;
  }

  @media (max-width: 768px) {
    column-count: 2;
  }

  @media (max-width: 480px) {
    column-count: 1;
  }
`;

const PhotoWrapper = styled.div`
  break-inside: avoid;
  margin-bottom: 20px;
  position: relative;
  overflow: hidden;
`;

const IntersectionTarget = styled.div`
  height: 20px;
  margin: 20px;
`;

const PhotoGrid = ({ initialPhotos, initialNextPageUrl }: PhotoGridProps) => {
  const [photos, setPhotos] = useState(initialPhotos);
  const [nextPageUrl, setNextPageUrl] = useState(initialNextPageUrl);
  const [error, setError] = useState<string | null>();
  const observerRef = useRef<HTMLDivElement | null>(null);

  const loadMorePhotos = useCallback(async () => {
    if (!nextPageUrl) return;

    try {
      const { photos: newPhotos, next_page: newNextPageUrl } = await fetchData(`/api/photos?pageUrl=${nextPageUrl}`);

      setPhotos((prev) => [...prev, ...newPhotos]);
      setNextPageUrl(newNextPageUrl);
    } catch (error) {
      setError(`Something went wrong! ${error}`);
    }
  }, [nextPageUrl]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          loadMorePhotos();
          observer.unobserve(entry.target);
        }
      });
    }, INTERSECTION_OBSERVER_OPTIONS);

    const target = observerRef.current;

    if (target) {
      observer.observe(target);
    }

    return () => {
      if (target) {
        observer.unobserve(target);
      }
    };
  }, [nextPageUrl, loadMorePhotos]);

  return (
    <>
      <Grid>
        {photos?.map(({ id, src, alt, width, height }: PhotoProps, index: number) => (
          <PhotoWrapper key={`${id}-${index}`}>
            <Link href={`/photo/${id}`}>
            <Image
              src={src.large}
              alt={alt}
              loading={index <= EAGER_LOAD_THRESHOLD ? 'eager' : 'lazy'}
              priority={index === 0}
              width={width}
              height={height}
              style={{ objectFit: 'contain', width: '100%', height: 'auto' }}
            />
            </Link>
          </PhotoWrapper>
        ))}
      </Grid>
      {error && <ErrorMessage message={error} />}
      <IntersectionTarget ref={observerRef} />
    </>
  );
};

export default PhotoGrid;
