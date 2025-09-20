import React, { useState } from 'react';
import { ChevronDownIcon, SparklesIcon, LanguageIcon, GiftIcon, WrenchScrewdriverIcon, WifiIcon } from '@heroicons/react/24/outline';

// Data for each FAQ section, based on the content you provided
const faqSections = [
  {
    id: 1,
    question: 'What is BusEasy and how can it improve my daily travel?',
    icon: SparklesIcon,
    answer: 'BusEasy is your smart travel companion that makes daily commuting simpler, faster, and stress-free. With real-time bus tracking, you can see the live location of your bus on the map, get accurate arrival times, and plan ahead with our powerful Journey Planner. Plus, smart stop alerts keep you informed so you never miss your stop again. With BusEasy, your everyday travel becomes easier, more reliable, and hassle-free.',
  },
  {
    id: 2,
    question: 'Is BusEasy available in languages other than English?',
    icon: LanguageIcon,
    answer: 'Yes! BusEasy offers full support for multiple regional languages, so you can use the app in the language you’re most comfortable with. Our goal is to make travel simple and stress-free for everyone.',
  },
  {
    id: 3,
    question: 'Is BusEasy free to use for commuters?',
    icon: GiftIcon,
    answer: 'Absolutely! BusEasy is completely free for all passengers. Designed as a low-cost, high-impact solution using open-source technology, it promotes public transport while making commuting easier and more reliable for everyone in the community.',
  },
  {
    id: 4,
    question: 'What are the main tools I can use on BusEasy?',
    icon: WrenchScrewdriverIcon,
    answer: (
      <>
        <p>BusEasy offers four key tools:</p>
        <ul className="mt-4 list-disc space-y-2 pl-5">
            <li>🚌 <strong>Real-Time Tracking</strong> – Live bus locations</li>
            <li>📍 <strong>Journey Planner</strong> – Best routes for your trip</li>
            <li>⏰ <strong>Smart Alerts</strong> – Timely trip updates</li>
            <li>📅 <strong>Schedules</strong> – Quick access to bus timings</li>
        </ul>
      </>
    ),
  },
  {
    id: 5,
    question: 'Will BusEasy work in my town where the internet is slow?',
    icon: WifiIcon,
    answer: 'Yes! BusEasy is designed for low-bandwidth areas. It loads fast, uses minimal data, and prioritizes essential updates so you stay informed even with weak connections.',
  },
];


export default function FAQ() {
  const [openSection, setOpenSection] = useState(1);

  const handleToggle = (id) => {
    setOpenSection(openSection === id ? null : id);
  };

  return (
    <div className="w-full min-h-screen bg-black text-white">
      <div className="mx-auto max-w-4xl px-4 pt-32 pb-16 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
            Frequently Asked Questions
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-400">
            Have questions? We have answers.
          </p>
        </div>

        <div className="mt-12 space-y-4">
          {faqSections.map((section) => {
            const Icon = section.icon;
            const isOpen = openSection === section.id;
            return (
              <div key={section.id} className="rounded-lg border border-white/10 bg-gray-900/50 transition-all duration-300">
                <button
                  onClick={() => handleToggle(section.id)}
                  className="flex w-full items-center justify-between p-6 text-left"
                >
                  <span className="flex items-center gap-4">
                    <Icon className="h-7 w-7 text-blue-400" />
                    <span className="text-xl font-semibold text-white">{section.question}</span>
                  </span>
                  <ChevronDownIcon
                    className={`h-6 w-6 text-gray-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                  />
                </button>
                <div
                  className={`grid transition-all duration-500 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
                >
                  <div className="overflow-hidden">
                    <div className="prose prose-invert prose-lg px-6 pb-6 text-gray-300">
                      {section.answer}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

