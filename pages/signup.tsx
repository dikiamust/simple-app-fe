import React from 'react';
import type { NextPage } from 'next';

// components
import Meta from 'components/Meta';
import Signup from 'containers/signup';

const SignupPage: NextPage = () => {
  return (
    <>
      <Meta
        title="Event Management"
        description="Event Management"
        pathName="/"
        thumbnail=""
      />
      <Signup />
    </>
  );
};

export default SignupPage;
