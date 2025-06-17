import React from "react";

const testimonials = [
   {
      name: "Jane Doe",
      title: "CEO, ExampleCorp",
      quote:
         "This service exceeded my expectations. The team was professional and the results were outstanding!",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
   },
   {
      name: "John Smith",
      title: "Developer, TechWorld",
      quote:
         "A fantastic experience from start to finish. Highly recommended for anyone looking for quality.",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
   },
   {
      name: "Emily Johnson",
      title: "Designer, Creatives Inc.",
      quote:
         "Their attention to detail and customer service is top-notch. I will definitely work with them again.",
      avatar: "https://randomuser.me/api/portraits/women/68.jpg",
   },
];

const Testimonials = () => (
   <section className="bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
         <h2 className="text-3xl font-bold text-center mb-8">What Our Clients Say</h2>
         <div className="grid gap-8 md:grid-cols-3">
            {testimonials.map((t, idx) => (
               <div
                  key={idx}
                  className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center text-center"
               >
                  <img
                     src={t.avatar}
                     alt={t.name}
                     className="w-16 h-16 rounded-full mb-4"
                  />
                  <p className="text-gray-700 italic mb-4">"{t.quote}"</p>
                  <div>
                     <span className="font-semibold">{t.name}</span>
                     <div className="text-sm text-gray-500">{t.title}</div>
                  </div>
               </div>
            ))}
         </div>
      </div>
   </section>
);

export default Testimonials;