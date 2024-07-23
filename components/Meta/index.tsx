import React from 'react';
import { NextSeo } from 'next-seo';

interface MetaProps {
  title: string;
  description: string;
  pathName: string;
  thumbnail: string;
}

function Meta(props: MetaProps) {
  const { title, description, pathName, thumbnail } = props;
  const path = pathName === '/' ? '' : pathName;

  return (
    <>
      <NextSeo
        title={title}
        description={description}
        canonical={`https://example.com${path}`}
        openGraph={{
          url: `https://example.com${path}`,
          title: title,
          description: description,
          images: [
            {
              url: thumbnail,
              alt: 'image-thumbnail',
              type: 'image/jpeg',
            },
          ],
          site_name: 'Simple Web App',
        }}
      />
    </>
  );
}

export default Meta;
