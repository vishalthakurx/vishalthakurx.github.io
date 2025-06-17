import React from "react";

const AdminPanel = () => {
   return (
      <div className="p-8 bg-gray-100 min-h-screen">
         <h1 className="text-3xl font-bold mb-6">Admin Panel</h1>
         <div className="bg-white rounded shadow p-6">
            <p className="text-gray-700">Welcome to the admin panel. Here you can manage users, view analytics, and configure settings.</p>
            {/* Add your admin controls and components here */}
         </div>
      </div>
   );
};

export default AdminPanel;