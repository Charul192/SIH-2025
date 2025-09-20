import React, { useState, useContext } from 'react'; // FIX: useContext import kiya
import { ChevronDownIcon, CheckBadgeIcon, MapPinIcon, ChartBarIcon, ShieldCheckIcon, ArrowPathIcon, EnvelopeIcon } from '@heroicons/react/24/outline';
import { AppContext } from '../../context/AppContext'; // FIX: AppContext import kiya

export default function PrivacyPolicy() {
  const { Dark } = useContext(AppContext); // FIX: Get theme state
  const [openSection, setOpenSection] = useState(1);

  const handleToggle = (id) => {
    setOpenSection(openSection === id ? null : id);
  };

  // Data for each policy section
  const policySections = [
    {
      id: 1,
      title: 'Our Privacy Promise',
      icon: CheckBadgeIcon,
      content: (
        <>
          <p className="font-semibold">We believe in privacy by design. Our core principle is to provide a powerful service without collecting your personal information.</p>
          <ul className="mt-4 list-disc space-y-2 pl-5">
            <li><strong>No Account Needed:</strong> You can use all main features of our app without creating an account, signing up, or providing personal details like your name, email, or phone number.</li>
            <li><strong>Anonymity First:</strong> The data required for the app to work is processed anonymously and is never linked to your personal identity.</li>
          </ul>
        </>
      ),
    },
    {
      id: 2,
      title: 'Data Required for App Functionality',
      icon: MapPinIcon,
      content: (
        <>
          <p>To make our app work, we need to use some data. Here’s what we use and why, in the simplest terms:</p>
          <ul className="list-disc space-y-2 pl-5">
            <li><strong>Anonymous Location Data:</strong> To show you where you are, where the buses are, and calculate accurate arrival times, the app needs access to your device's current location. This information is used only while you are using the app and is not stored or linked to you personally.</li>
            <li><strong>Anonymous App Performance Data:</strong> We collect non-personal technical data, like crash reports or which features are used most. This helps us fix bugs and improve the app, especially our goal of keeping it fast in low-bandwidth areas. This data is completely anonymous.</li>
            <li><strong>Voluntary Feedback:</strong> If you choose to give us feedback, we may ask for your name or email. This is the ONLY time we ask for personal data, and it is 100% optional. We only use it to reply to you.</li>
          </ul>
        </>
      ),
    },
    {
      id: 3,
      title: 'How We Use This Data',
      icon: ChartBarIcon,
      content: (
        <>
          <p>We use this limited, anonymous data for one purpose only: to provide and improve the service.</p>
          <ul className="list-disc space-y-2 pl-5">
            <li>To power live tracking, arrival time predictions, and journey planning.</li>
            <li>To find and fix bugs, crashes, and performance issues.</li>
            <li>To understand which features are most helpful to users so we can make them better.</li>
          </ul>
        </>
      ),
    },
    {
      id: 4,
      title: 'Data Sharing',
      icon: ShieldCheckIcon,
      content: <p>We do not and will not sell, rent, or trade your data with any third party. Your trust is our most important asset.</p>,
    },
    {
      id: 5,
      title: 'Policy Updates',
      icon: ArrowPathIcon,
      content: <p>As our app evolves, we may update this policy. Any changes will be posted here. We encourage you to review it periodically.</p>,
    },
    {
      id: 6,
      title: 'Contact Us',
      icon: EnvelopeIcon,
      content: (
        <p>
          If you have any questions or suggestions regarding our privacy policy, please contact us at:
          <br />
          {/* FIX: Link color is now dynamic */}
          <a href="mailto:privacy@buseasy-sih.com" className={`font-semibold ${Dark ? 'text-blue-400 hover:underline' : 'text-blue-600 hover:underline'}`}>privacy@buseasy-sih.com</a>
        </p>
      ),
    },
  ];

  return (
    // FIX: Main container is now theme-aware
    <div className={`w-full min-h-screen transition-colors duration-300 ${Dark ? 'bg-black text-slate-50' : 'bg-white text-slate-900'}`}>
      <div className="mx-auto max-w-4xl px-4 pt-32 pb-16 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
            Privacy Policy
          </h1>
          {/* FIX: Subtitle color is now theme-aware */}
          <p className={`mx-auto mt-4 max-w-2xl text-lg ${Dark ? 'text-slate-400' : 'text-slate-600'}`}>
            Your Trust, Our Priority.
          </p>
        </div>

        <div className="mt-12 space-y-4">
          {policySections.map((section) => {
            const Icon = section.icon;
            const isOpen = openSection === section.id;
            return (
              // FIX: Accordion item is now theme-aware
              <div key={section.id} className={`rounded-lg border transition-all duration-300 ${Dark ? 'border-white/10 bg-gray-900/50' : 'border-slate-200 bg-slate-50'}`}>
                <button
                  onClick={() => handleToggle(section.id)}
                  className="flex w-full items-center justify-between p-6 text-left"
                >
                  <span className="flex items-center gap-4">
                    <Icon className={`h-7 w-7 ${Dark ? 'text-blue-400' : 'text-blue-600'}`} />
                    <span className="text-xl font-semibold">{section.title}</span>
                  </span>
                  <ChevronDownIcon
                    className={`h-6 w-6 transition-transform duration-300 ${Dark ? 'text-gray-400' : 'text-gray-500'} ${isOpen ? 'rotate-180' : ''}`}
                  />
                </button>
                <div
                  className={`grid transition-all duration-500 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
                >
                  <div className="overflow-hidden">
                    {/* FIX: Accordion content is now theme-aware */}
                    <div className={`prose prose-lg px-6 pb-6 ${Dark ? 'prose-invert text-slate-300' : 'text-slate-600'}`}>
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

