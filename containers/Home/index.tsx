import React from 'react';

// components
import Footer from 'components/Footer';
import Hero from './Hero';
import Header from 'components/Header';
import Agenda from './agenda';

const Home = () => {
  return (
    <>
      <Header />
      <Hero />
      <Agenda />
      <Footer />
    </>
  );
};

export default Home;
