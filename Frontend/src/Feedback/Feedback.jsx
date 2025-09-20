import React, { useState } from 'react';
import { ChatBubbleLeftRightIcon, BugAntIcon, LightBulbIcon, CheckCircleIcon } from '@heroicons/react/24/outline';

export default function Feedback() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    feedbackType: 'General',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      console.log('Feedback Submitted:', formData);
    }, 1500);
  };

  // The content for the left side of the screen
  const InfoContent = () => (
    <div>
      <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
        Help Us Improve
      </h1>
      <p className="mt-4 text-lg text-gray-400">
        Your feedback is invaluable in our mission to improve urban mobility. Whether you've found a bug, have a feature idea, or just want to share your experience, we're listening.
      </p>
      <ul className="mt-8 space-y-4 text-gray-300">
        <li className="flex items-center gap-3">
          <BugAntIcon className="h-6 w-6 text-blue-400" />
          <span>Report bugs and issues</span>
        </li>
        <li className="flex items-center gap-3">
          <LightBulbIcon className="h-6 w-6 text-blue-400" />
          <span>Suggest new features</span>
        </li>
        <li className="flex items-center gap-3">
          <ChatBubbleLeftRightIcon className="h-6 w-6 text-blue-400" />
          <span>Share general feedback</span>
        </li>
      </ul>
    </div>
  );

  return (
    <div className="w-full bg-black text-white">
      <div className="mx-auto min-h-screen max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-5xl flex-col items-center justify-center lg:flex-row lg:gap-16">
          
          {/* Left Side: Information */}
          <div className="mb-12 text-center lg:mb-0 lg:w-1/2 lg:text-left">
            <InfoContent />
          </div>

          {/* Right Side: Form or Success Message */}
          <div className="w-full lg:w-1/2">
            {isSubmitted ? (
              // Success Message
              <div className="flex h-full min-h-[400px] flex-col items-center justify-center rounded-xl bg-slate-900/50 p-8 text-center ring-1 ring-white/10">
                <CheckCircleIcon className="h-16 w-16 text-green-500" />
                <h2 className="mt-4 text-3xl font-bold tracking-tight">Thank You!</h2>
                <p className="mt-2 text-lg text-gray-400">Your feedback has been received.</p>
                <button
                  onClick={() => {
                    setIsSubmitted(false);
                    setFormData({ name: '', email: '', feedbackType: 'General', message: '' });
                  }}
                  className="mt-8 rounded-lg bg-blue-600 px-6 py-2.5 text-base font-semibold text-white shadow-lg transition-transform hover:scale-105"
                >
                  Submit Another
                </button>
              </div>
            ) : (
              // Feedback Form
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="text-base font-medium text-gray-300">Feedback Type</label>
                  <fieldset className="mt-2.5 grid grid-cols-1 gap-3 sm:grid-cols-3">
                    {/* CORRECTED className prop with backticks */}
                    <label className={`relative flex cursor-pointer items-center justify-center rounded-md p-3 text-sm ring-1 ring-inset transition-all duration-200 ${formData.feedbackType === 'General' ? 'bg-blue-600/80 ring-blue-500' : 'ring-gray-700 hover:bg-gray-800'}`}>
                      <input type="radio" name="feedbackType" value="General" className="sr-only" onChange={handleChange} checked={formData.feedbackType === 'General'} />
                      <ChatBubbleLeftRightIcon className="h-5 w-5 mr-2" /> General
                    </label>
                    {/* CORRECTED className prop with backticks */}
                    <label className={`relative flex cursor-pointer items-center justify-center rounded-md p-3 text-sm ring-1 ring-inset transition-all duration-200 ${formData.feedbackType === 'Bug' ? 'bg-blue-600/80 ring-blue-500' : 'ring-gray-700 hover:bg-gray-800'}`}>
                      <input type="radio" name="feedbackType" value="Bug" className="sr-only" onChange={handleChange} checked={formData.feedbackType === 'Bug'} />
                      <BugAntIcon className="h-5 w-5 mr-2" /> Bug
                    </label>
                    {/* CORRECTED className prop with backticks */}
                    <label className={`relative flex cursor-pointer items-center justify-center rounded-md p-3 text-sm ring-1 ring-inset transition-all duration-200 ${formData.feedbackType === 'Feature' ? 'bg-blue-600/80 ring-blue-500' : 'ring-gray-700 hover:bg-gray-800'}`}>
                      <input type="radio" name="feedbackType" value="Feature" className="sr-only" onChange={handleChange} checked={formData.feedbackType === 'Feature'} />
                      <LightBulbIcon className="h-5 w-5 mr-2" /> Feature
                    </label>
                  </fieldset>
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium leading-6 text-gray-300">Message</label>
                  <div className="mt-1">
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      className="block w-full rounded-md border-0 bg-white/5 py-2.5 px-3.5 text-white shadow-sm ring-1 ring-inset ring-white/10 transition-colors duration-300 placeholder:text-gray-500 focus:ring-2 focus:ring-inset focus:ring-blue-500"
                      placeholder="Tell us what's on your mind..."
                      value={formData.message}
                      onChange={handleChange}
                      required
                    ></textarea>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-300">Name <span className="text-xs text-gray-500">(Optional)</span></label>
                    <div className="mt-1">
                      <input
                        type="text"
                        name="name"
                        id="name"
                        className="block w-full rounded-md border-0 bg-white/5 py-2.5 px-3.5 text-white shadow-sm ring-1 ring-inset ring-white/10 transition-colors duration-300 placeholder:text-gray-500 focus:ring-2 focus:ring-inset focus:ring-blue-500"
                        placeholder="Your Name"
                        value={formData.name}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-300">Email <span className="text-xs text-gray-500">(Optional)</span></label>
                    <div className="mt-1">
                      <input
                        type="email"
                        name="email"
                        id="email"
                        className="block w-full rounded-md border-0 bg-white/5 py-2.5 px-3.5 text-white shadow-sm ring-1 ring-inset ring-white/10 transition-colors duration-300 placeholder:text-gray-500 focus:ring-2 focus:ring-inset focus:ring-blue-500"
                        placeholder="you@example.com"
                        value={formData.email}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>
                
                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full items-center justify-center rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-3 text-base font-semibold text-white shadow-lg transition-transform hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit Feedback'}
                  </button>
                </div>
              </form>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
