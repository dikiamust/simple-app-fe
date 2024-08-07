import React from 'react';
import type { NextPage } from 'next';

// components
import Meta from 'components/Meta';
import Signin from 'containers/signin';

const SigninPage: NextPage = () => {
  return (
    <>
      <Meta
        title="Simple-App"
        description="Simple-App"
        pathName="/"
        thumbnail=""
      />
      <Signin />
    </>
  );
};

export default SigninPage;
