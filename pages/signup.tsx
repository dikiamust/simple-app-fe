import React from 'react';
import type { NextPage } from 'next';

// components
import Meta from 'components/Meta';
import Signup from 'containers/signup';

const SignupPage: NextPage = () => {
  return (
    <>
      <Meta
        title="Simple-App"
        description="Simple-App"
        pathName="/"
        thumbnail=""
      />
      <Signup />
    </>
  );
};

export default SignupPage;
