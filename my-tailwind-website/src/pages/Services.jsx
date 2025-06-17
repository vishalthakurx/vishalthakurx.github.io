import React from "react";

const services = [
   {
      title: "Web Development",
      description: "Building responsive and modern websites using the latest technologies.",
   },
   {
      title: "UI/UX Design",
      description: "Designing user-friendly interfaces and seamless user experiences.",
   },
   {
      title: "SEO Optimization",
      description: "Improving website visibility and ranking on search engines.",
   },
];

const Services = () => (
   <div className="max-w-4xl mx-auto py-12 px-4">
      <h1 className="text-4xl font-bold mb-8 text-center">Our Services</h1>
      <div className="grid md:grid-cols-3 gap-8">
         {services.map((service, idx) => (
            <div
               key={idx}
               className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow"
            >
               <h2 className="text-2xl font-semibold mb-4">{service.title}</h2>
               <p className="text-gray-600">{service.description}</p>
            </div>
         ))}
      </div>
   </div>
);

export default Services;