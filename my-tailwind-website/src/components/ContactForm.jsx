import React, { useState } from "react";

const ContactForm = () => {
   const [form, setForm] = useState({
      name: "",
      email: "",
      message: "",
   });
   const [submitted, setSubmitted] = useState(false);

   const handleChange = (e) => {
      setForm({ ...form, [e.target.name]: e.target.value });
   };

   const handleSubmit = (e) => {
      e.preventDefault();
      // Here you can handle form submission (e.g., send to API)
      setSubmitted(true);
   };

   return (
      <div className="max-w-md mx-auto p-6 bg-white rounded shadow">
         <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
         {submitted ? (
            <div className="text-green-600">Thank you for contacting us!</div>
         ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
               <div>
                  <label className="block mb-1 font-medium" htmlFor="name">
                     Name
                  </label>
                  <input
                     className="w-full border border-gray-300 rounded px-3 py-2"
                     type="text"
                     id="name"
                     name="name"
                     value={form.name}
                     onChange={handleChange}
                     required
                  />
               </div>
               <div>
                  <label className="block mb-1 font-medium" htmlFor="email">
                     Email
                  </label>
                  <input
                     className="w-full border border-gray-300 rounded px-3 py-2"
                     type="email"
                     id="email"
                     name="email"
                     value={form.email}
                     onChange={handleChange}
                     required
                  />
               </div>
               <div>
                  <label className="block mb-1 font-medium" htmlFor="message">
                     Message
                  </label>
                  <textarea
                     className="w-full border border-gray-300 rounded px-3 py-2"
                     id="message"
                     name="message"
                     rows="4"
                     value={form.message}
                     onChange={handleChange}
                     required
                  />
               </div>
               <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
               >
                  Send Message
               </button>
            </form>
         )}
      </div>
   );
};

export default ContactForm;