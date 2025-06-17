import React from "react";

const services = [
   {
      title: "Web Development",
      description: "Building responsive and modern web applications using the latest technologies.",
      icon: "🌐",
   },
   {
      title: "UI/UX Design",
      description: "Designing user-friendly interfaces and seamless user experiences.",
      icon: "🎨",
   },
   {
      title: "SEO Optimization",
      description: "Improving website visibility and ranking on search engines.",
      icon: "🚀",
   },
];

const Services = () => (
   <section className="py-12 bg-gray-50">
      <div className="max-w-5xl mx-auto px-4">
         <h2 className="text-3xl font-bold text-center mb-8">Our Services</h2>
         <div className="grid gap-8 md:grid-cols-3">
            {services.map((service, idx) => (
               <div
                  key={idx}
                  className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center text-center hover:shadow-xl transition-shadow"
               >
                  <div className="text-5xl mb-4">{service.icon}</div>
                  <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                  <p className="text-gray-600">{service.description}</p>
               </div>
            ))}
         </div>
      </div>
   </section>
);

export default Services;