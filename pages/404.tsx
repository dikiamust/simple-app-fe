import React from 'react';
import type { NextPage } from 'next';

// components
import NotFoundContainer from 'containers/404';
import Meta from 'components/Meta';

const NotFound: NextPage = () => {
  return (
    <>
      <Meta
        title="404 Not Found"
        description="Oh no... we are not supposed to be here"
        pathName="/404"
        thumbnail=""
      />
      <NotFoundContainer />
    </>
  );
};

export default NotFound;
