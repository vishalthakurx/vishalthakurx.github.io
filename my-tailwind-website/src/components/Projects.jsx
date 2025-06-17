import React from "react";

const projects = [
   {
      title: "Portfolio Website",
      description: "A personal portfolio website built with React and Tailwind CSS.",
      link: "https://github.com/vishalthakurx/portfolio",
   },
   {
      title: "Weather App",
      description: "A simple weather application using OpenWeatherMap API.",
      link: "https://github.com/vishalthakurx/weather-app",
   },
   {
      title: "Task Manager",
      description: "A task management app with CRUD operations.",
      link: "https://github.com/vishalthakurx/task-manager",
   },
];

const Projects = () => (
   <section className="py-12 bg-gray-100" id="projects">
      <div className="max-w-4xl mx-auto px-4">
         <h2 className="text-3xl font-bold mb-8 text-center">Projects</h2>
         <div className="grid md:grid-cols-2 gap-8">
            {projects.map((project, idx) => (
               <div key={idx} className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
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
   </section>
);

export default Projects;