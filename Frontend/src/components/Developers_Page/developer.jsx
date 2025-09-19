import React from "react";
import { Link } from "react-router-dom";

// import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";

// You can replace this with the actual path to your image
const developerImageUrl = "https://via.placeholder.com/150"; 

export default function Developer() {
  return (
    <div className="w-full bg-gray-900 py-16 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-center gap-12 lg:flex-row lg:gap-16">
        
        {/* Developer Image */}
        <div className="flex-shrink-0">
          <img
            className="h-48 w-48 rounded-full border-4 border-gray-700 object-cover shadow-lg"
            src={developerImageUrl}
            alt="Profile of the developer"
          />
        </div>

        {/* Developer Information */}
        <div className="text-center lg:text-left">
          <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Your Name
          </h2>
          <p className="mt-2 text-xl font-medium text-indigo-400">
            Full-Stack Web Developer
          </p>
          <p className="mt-4 max-w-2xl text-lg text-gray-300">
            A passionate developer with expertise in creating modern, responsive,
            and user-friendly web applications. I love turning complex problems
            into simple, beautiful, and intuitive designs.
          </p>

          {/* Social Media Links */}
          <div className="mt-6 flex justify-center gap-6 lg:justify-start">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 transition-colors duration-300 hover:text-white"
              aria-label="GitHub Profile"
            >
              <FaGithub size={30} />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 transition-colors duration-300 hover:text-white"
              aria-label="LinkedIn Profile"
            >
              <FaLinkedin size={30} />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 transition-colors duration-300 hover:text-white"
              aria-label="Twitter Profile"
            >
              <FaTwitter size={30} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}