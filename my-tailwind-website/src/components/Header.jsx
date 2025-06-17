import React from 'react';

const Header = () => {
   return (
      <header className="bg-blue-600 text-white py-4 shadow-md">
         <div className="container mx-auto flex justify-between items-center px-4">
            <h1 className="text-2xl font-bold">My Tailwind Website</h1>
            <nav>
               <ul className="flex space-x-6">
                  <li>
                     <a href="#" className="hover:text-blue-200 transition">Home</a>
                  </li>
                  <li>
                     <a href="#" className="hover:text-blue-200 transition">About</a>
                  </li>
                  <li>
                     <a href="#" className="hover:text-blue-200 transition">Contact</a>
                  </li>
               </ul>
            </nav>
         </div>
      </header>
   );
};

export default Header;