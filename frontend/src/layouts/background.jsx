import React from 'react';
import Footer from './footer';
import Navbar from './navbar';

const Background = ({ children }) => {
  return (
    <div className="flex flex-col bg-white">
      <Navbar />
      <div className="grid grid-rows-[auto-1fr-auto] min-h-[120vh]">
        <div className="flex w-screen h-full">{children}</div>
        <Footer />
      </div>
    </div>
  );
};

export default Background;
