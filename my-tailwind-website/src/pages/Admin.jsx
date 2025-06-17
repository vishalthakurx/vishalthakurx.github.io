import React from "react";

const Admin = () => {
   return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
         <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
            <h1 className="text-2xl font-bold mb-4 text-center">Admin Dashboard</h1>
            <p className="text-gray-700 text-center">
               Welcome to the admin panel. Manage your website content here.
            </p>
         </div>
      </div>
   );
};

export default Admin;