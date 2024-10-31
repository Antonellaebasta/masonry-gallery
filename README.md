This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).
This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Getting Started

1. Checkout the project

```bash
git clone git@github.com:Antonellaebasta/masonry-gallery.git
```

2. Install dependencies

```bash
yarn
```

3. Run development server

```bash
yarn dev
```

4. Open [http://localhost:3000/photos](http://localhost:3000/photos) with your browser to see the result

## Overview

This application is a photo gallery built with Next.js, showcasing curated images from Pexels. The app allows users to browse photos in a masonry grid layout, view details for each image, and load more photos as they scroll down.

## Key Features

- **Curated Photo Gallery**: Displays high-quality images from Pexels.
- **Infinite Scroll**: Users can load more photos seamlessly as they scroll.
- **Responsive Design**: Optimized for both desktop and mobile viewing.
- **Image Details**: Clicking on a photo opens a detailed view.

## Performance Optimizations

To enhance the performance of the application, several optimizations have been implemented:

1. **Lazy Loading Images**:
   - Images are loaded only when they come into the viewport, reducing initial load time and resource usage.
   - Utilized the Next.js Image component, which automatically optimizes images for performance, handling responsive image sizes.
   - [Priority](https://nextjs.org/docs/pages/api-reference/components/image#priority) is set to true if img index is 0, ensuring the first image is loaded eagerly. For other images, the loading strategy switches between 'eager' and 'lazy' based on whether the index is less than or equal to the EAGER_LOAD_THRESHOLD (set to 10).

2. **Intersection Observer**:
   - Utilized the Intersection Observer API to efficiently handle image loading based on visibility, improving the user experience during scrolling.

3. **Efficient State Management**:
   - Used React hooks (`useState`, `useEffect`, `useCallback`) to manage component states and side effects, leading to more predictable and performant re-renders.

4. **Custom API Routes**:
   - Created API routes in Next.js to fetch data from the Pexels API, enabling server-side processing and better security for API keys.

5. **Content Visibility**:
   - Used the `content-visibility` CSS property to improve rendering performance by skipping the rendering of off-screen content, and set `contain-intrinsic-size` and proper aspect ratios for images to maintain layout stability and reduce layout shifts.
