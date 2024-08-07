import React from 'react';
import type { NextPage } from 'next';

// components
import HomeContainer from 'containers/Home';
import Meta from 'components/Meta';

const Home: NextPage = () => {
  return (
    <>
      <Meta
        title="Simple-App"
        description="Simple-App"
        pathName="/"
        thumbnail=""
      />
      <HomeContainer />
    </>
  );
};

export default Home;
