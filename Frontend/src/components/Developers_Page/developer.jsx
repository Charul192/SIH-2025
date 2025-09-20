import React, { useContext } from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { AppContext } from "../../context/AppContext"; // FIX: AppContext import kiya

// --- Team information (No changes needed) ---
const developersData = [
  {
    id: 1,
    name: "Aashwat Jain",
    title: "Lead Full-Stack Developer",
    bio: "Architecting the core infrastructure and leading the team with a passion for clean code and performance.",
    socials: {
      github: "https://github.com/Aashwat11",
      linkedin: "https://linkedin.com/in/",
    },
  },
  {
    id: 2,
    name: "Aniket Kedia",
    title: "Frontend Specialist & UI/UX",
    bio: "Crafting beautiful, intuitive user interfaces with a keen eye for responsive design and accessibility.",
    socials: {
      github: "https://github.com/",
      linkedin: "https://linkedin.com/in/",
    },
  },
  {
    id: 3,
    name: "Charul ",
    title: "Backend Engineer",
    bio: "Building robust APIs and managing the database to ensure our application runs smoothly and securely.",
    socials: {
      github: "https://github.com/",
      linkedin: "https://linkedin.com/in/",
    },
  },
  {
    id: 4,
    name: "Harman Singla",
    title: "Mobile App Developer",
    bio: "Developing our cross-platform mobile application to bring real-time tracking to your fingertips.",
    socials: {
      github: "https://github.com/",
      linkedin: "https://linkedin.com/in/",
    },
  },
  {
    id: 5,
    name: "Pranav",
    title: "DevOps & Cloud Engineer",
    bio: "Ensuring our services are scalable, reliable, and always available through robust cloud infrastructure.",
    socials: {
      github: "https://github.com/",
      linkedin: "https://linkedin.com/in/",
    },
  },
  {
    id: 6,
    name: "Bhavuk Mittal",
    title: "QA & Testing Lead",
    bio: "Dedicated to quality assurance, ensuring a bug-free and seamless experience for all our users.",
    socials: {
      github: "https://github.com/",
      linkedin: "https://linkedin.com/in/",
    },
  },
];


// FIX: DeveloperCard ab 'Dark' prop leta hai taaki theme ke hisaab se style badal sake
function DeveloperCard({ name, title, bio, socials, Dark }) {
  return (
    <div className={`flex transform flex-col rounded-2xl p-6 text-center shadow-lg ring-1 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/20 ${Dark ? 'bg-slate-900/50 ring-white/10' : 'bg-slate-50 ring-slate-200'}`}>
      <div className="flex-grow">
        <h3 className={`text-xl font-bold ${Dark ? 'text-white' : 'text-slate-900'}`}>{name}</h3>
        <p className={`mt-1 text-base font-medium ${Dark ? 'text-blue-400' : 'text-blue-600'}`}>{title}</p>
        <p className={`mt-3 text-sm ${Dark ? 'text-gray-400' : 'text-slate-500'}`}>{bio}</p>
      </div>
      <div className={`mt-4 flex gap-4 pt-4 border-t w-full justify-center ${Dark ? 'border-white/10' : 'border-slate-200'}`}>
        <a href={socials.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className={`transition-colors ${Dark ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-slate-900'}`}><FaGithub size={24} /></a>
        <a href={socials.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className={`transition-colors ${Dark ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-slate-900'}`}><FaLinkedin size={24} /></a>
      </div>
    </div>
  );
}


// The main page component
export default function Developer() {
  const { Dark } = useContext(AppContext); // FIX: Get theme state

  return (
    // FIX: Main container ab theme-aware hai
    <div className={`w-full py-20 px-4 sm:px-6 lg:px-8 transition-colors duration-300 ${Dark ? 'bg-black' : 'bg-white'}`}>
      <div className="mx-auto max-w-7xl">
        <div className="text-center">
          <h1 className={`text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl ${Dark ? 'text-white' : 'text-slate-900'}`}>
            Meet the <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">Team</span>
          </h1>
          <p className={`mx-auto mt-4 max-w-2xl text-lg ${Dark ? 'text-gray-400' : 'text-slate-600'}`}>
            The passionate minds behind this project, dedicated to improving your daily commute.
          </p>
        </div>
        <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {developersData.map((dev) => (
            <DeveloperCard
              key={dev.id}
              name={dev.name}
              title={dev.title}
              bio={dev.bio}
              socials={dev.socials}
              Dark={Dark} // FIX: Pass theme state to card
            />
          ))}
        </div>
      </div>
    </div>
  );
}