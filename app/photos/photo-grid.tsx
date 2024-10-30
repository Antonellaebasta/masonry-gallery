'use client';

import Image from 'next/image';
import { useEffect, useState, useRef, useCallback } from 'react';
import styled from 'styled-components';

import { fetchPhotos } from '../utils';
import { PhotoProps, PhotoGridProps } from '../types';

const INTERSECTION_OBSERVER_OPTIONS = {
  root: null,
  rootMargin: '0px',
  threshold: 1.0,
};
const EAGER_LOAD_THRESHOLD = 20;
const IMG_SIZES = '(max-width: 480px) 280px, (max-width: 768px) 640px, (max-width: 1024px) 768px, 940px';

const Grid = styled.div`
  column-count: 4;
  column-gap: 20px;
  margin: 16px;
  content-visibility: auto;

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

const ErrorMessageContainer = styled.div`
  background-color: #f8d7da;
  color: #721c24;
  border: 1px solid #f5c6cb;
  padding: 16px;
  border-radius: 8px;
  margin: 16px;
  font-size: 16px;
  display: flex;
  align-items: center;

  &::before {
    content: '⚠️';
    margin-right: 10px;
  }
`;

const PhotoGrid = ({ initialPhotos, initialNextPageUrl }: PhotoGridProps) => {
  const [photos, setPhotos] = useState(initialPhotos);
  const [nextPageUrl, setNextPageUrl] = useState(initialNextPageUrl);
  const [error, setError] = useState<string | null>();
  const observerRef = useRef<HTMLDivElement | null>(null);

  const loadMorePhotos = useCallback(async () => {
    if (!nextPageUrl) return;

    try {
      const { photos: newPhotos, nextPageUrl: newNextPageUrl } = await fetchPhotos(`/api/photos?pageUrl=${nextPageUrl}`);
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
  }, [observerRef, nextPageUrl, loadMorePhotos]);

  return (
    <>
      <Grid>
        {photos?.map(({ id, src, alt, width, height }: PhotoProps, index: number) => (
          <PhotoWrapper key={`${id}-${index}`}>
            <Image
              src={src.large}
              alt={alt}
              loading={index <= EAGER_LOAD_THRESHOLD ? 'eager' : 'lazy'}
              layout="responsive"
              sizes={IMG_SIZES}
              width={width}
              height={height}
              placeholder="blur"
              blurDataURL={src.tiny}
            />
          </PhotoWrapper>
        ))}
      </Grid>
      {error && <ErrorMessageContainer>{error}</ErrorMessageContainer>}
      <IntersectionTarget ref={observerRef} />
    </>
  );
};

export default PhotoGrid;