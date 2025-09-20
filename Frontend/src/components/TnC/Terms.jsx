import React, { useState } from 'react';
import { ChevronDownIcon, ClipboardDocumentCheckIcon, MapIcon, UserIcon, ExclamationTriangleIcon, KeyIcon, ScaleIcon, ArrowPathIcon } from '@heroicons/react/24/outline';

// Data for each Terms and Conditions section
const termsSections = [
  {
    id: 1,
    title: 'Acceptance of Terms',
    icon: ClipboardDocumentCheckIcon,
    content: (
      <p>Welcome to BusEasy ("the Service"). By accessing or using our application, you agree to be bound by these Terms and Conditions. If you do not agree with any part of these terms, you may not use our service. These terms apply to all users of the app.</p>
    ),
  },
  {
    id: 2,
    title: 'Description of Service',
    icon: MapIcon,
    content: (
        <>
            <p>Our service provides users with real-time public transport tracking for cities. Key features include:</p>
            <ul className="mt-4 list-disc space-y-2 pl-5">
                <li>Live location tracking of buses on an interactive map.</li>
                <li>Accurate Estimated Times of Arrival (ETAs) for bus stops.</li>
                <li>A journey planner to find the most efficient routes.</li>
                <li>Functionality designed to be reliable even in low-bandwidth regions.</li>
            </ul>
        </>
    ),
  },
  {
    id: 3,
    title: 'User Responsibilities',
    icon: UserIcon,
    content: (
        <>
            <p>You agree to use the Service for its intended purpose and in compliance with all applicable laws. You agree not to:</p>
            <ul className="mt-4 list-disc space-y-2 pl-5">
                <li>Use the service for any illegal or unauthorized purpose.</li>
                <li>Attempt to reverse engineer, decompile, or otherwise access the source code of the application.</li>
                <li>Interfere with or disrupt the integrity or performance of the Service.</li>
                <li>Use the app for any commercial purposes without our express written consent.</li>
            </ul>
        </>
    ),
  },
  {
    id: 4,
    title: 'Service Availability & Accuracy',
    icon: ExclamationTriangleIcon,
    content: <p>The service is provided on an "as is" and "as available" basis. While we strive for accuracy, the location data, ETAs, and other information are estimates and may not always be perfectly accurate due to factors like traffic, network issues, or GPS errors. We do not guarantee that the service will be uninterrupted or error-free.</p>,
  },
  {
    id: 5,
    title: 'Intellectual Property',
    icon: KeyIcon,
    content: <p>All rights, title, and interest in and to the Service (including the app's design, logo, and source code) are and will remain the exclusive property of our team. The Service is protected by copyright and other laws of India.</p>,
  },
  {
    id: 6,
    title: 'Governing Law',
    icon: ScaleIcon,
    content: <p>These Terms shall be governed and construed in accordance with the laws of India, with exclusive jurisdiction for any disputes falling under the courts in Sonipat, Haryana.</p>,
  },
  {
    id: 7,
    title: 'Changes to Terms',
    icon: ArrowPathIcon,
    content: <p>We reserve the right to modify or replace these Terms at any time. We will provide notice of any significant changes. By continuing to use the Service after those revisions become effective, you agree to be bound by the revised terms.</p>,
  },
];


export default function TermsAndConditions() {
  const [openSection, setOpenSection] = useState(1);

  const handleToggle = (id) => {
    setOpenSection(openSection === id ? null : id);
  };

  return (
    <div className="w-full min-h-screen bg-black text-white">
      <div className="mx-auto max-w-4xl px-4 pt-32 pb-16 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
            Terms and Conditions
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-400">
            Please read these terms carefully before using our service.
          </p>
        </div>

        <div className="mt-12 space-y-4">
          {termsSections.map((section) => {
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
                    <span className="text-xl font-semibold text-white">{section.title}</span>
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
                      {section.content}
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
