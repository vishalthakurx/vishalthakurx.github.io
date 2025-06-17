import React from "react";

const projects = [
   {
      title: "Portfolio Website",
      description: "A personal portfolio website built with React and Tailwind CSS.",
      link: "https://github.com/vishalthakurx/portfolio",
   },
   {
      title: "E-commerce Store",
      description: "A simple e-commerce store with product listing and cart functionality.",
      link: "https://github.com/vishalthakurx/ecommerce-store",
   },
   // Add more projects as needed
];

const Projects = () => (
   <div className="min-h-screen bg-gray-100 py-10 px-4">
      <h1 className="text-4xl font-bold mb-8 text-center">My Projects</h1>
      <div className="grid gap-8 md:grid-cols-2 max-w-4xl mx-auto">
         {projects.map((project, idx) => (
            <div
               key={idx}
               className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow"
            >
               <h2 className="text-2xl font-semibold mb-2">{project.title}</h2>
               <p className="mb-4 text-gray-700">{project.description}</p>
               <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline font-medium"
               >
                  View on GitHub
               </a>
            </div>
         ))}
      </div>
   </div>
);

export default Projects;