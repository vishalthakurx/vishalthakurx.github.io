import React from 'react';

const HeroSection = () => {
   return (
      <section className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-20">
         <div className="container mx-auto px-6 flex flex-col items-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 text-center">
               Welcome to My Tailwind Website
            </h1>
            <p className="text-lg md:text-2xl mb-8 text-center max-w-2xl">
               Build modern, responsive websites quickly with Tailwind CSS and React.
            </p>
            <a
               href="#"
               className="bg-white text-blue-600 font-semibold px-8 py-3 rounded shadow hover:bg-blue-100 transition"
            >
               Get Started
            </a>
         </div>
      </section>
   );
};

export default HeroSection;